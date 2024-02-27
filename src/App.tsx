import { useEffect, useState, FC } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { observer } from "mobx-react-lite";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import {
  Chat,
  GroupDetail,
  ContactList,
  ContactDetail,
  Header,
  rootStore,
  ConversationList,
  Provider,
  useClient,
  Icon,
  Avatar,
  MessageList,
  useConversationContext,
  useChatContext,
  UserSelect,
  TextMessage,
  GroupMember,
  Modal,
  Input,
  eventHandler,
  Thread,
} from "easemob-chat-uikit";
import "easemob-chat-uikit/style.css";
import "./App.css";
import AppRoutes from "./routes/routes";

// @ts-ignore
window.rootStore = rootStore;
const ChatApp: FC<any> = () => {
  const client = useClient();
  // useEffect(() => {
  //   client &&
  //     client
  //       .open({
  //         user: 'zd3',
  //         // pwd: '272808',
  //         accessToken:
  //           'YWMtgwTHNZPxQviWaqMIJTHfFyhYwv00w0hrtpGKy_Jc3V2J3LcwYk0R7J9BM4gepb6yAwMAAAGLCXYIsQABTnFcluGlL4BdlKN4Qdf0EQThNgjgWh4vB9JhWxj-X18Ucg==',
  //       })
  //       .then(res => {
  //         console.log('获取token成功', res, rootStore.client);
  //       });
  // }, [client]);

  // console.log('rootStore', rootStore.conversationStore.currentCvs);

  let {
    topConversation: topConversationInner,
    currentConversation,
    conversationList,
    setCurrentConversation,
  } = useConversationContext();

  let { messages } = useChatContext();
  console.log(11111, messages);
  // const topConversation = () => {
  //   setCurrentConversation({
  //     chatType: "groupChat",
  //     conversationId: "226377652568065",
  //     name: "zd2",
  //     unreadCount: 0,
  //   });
  //   console.log(222, currentConversation);
  //   console.log("222", rootStore.conversationStore.currentCvs);
  //   topConversationInner({
  //     chatType: "groupChat",
  //     conversationId: "226377652568065",
  //     lastMessage: {},
  //   });
  // };

  const thread = rootStore.threadStore;

  let TxtMsg = (msg: any) => (
    <TextMessage
      bubbleType="secondly"
      bubbleStyle={{ background: "hsl(135.79deg 88.79% 36.46%)" }}
      shape="square"
      arrow={false}
      avatar={<Avatar style={{ background: "pink" }}>zhangdong</Avatar>}
      textMessage={{
        msg: msg.msg || "hello",
        type: "txt",
        id: "1234",
        to: "zd5",
        from: "zd2",
        chatType: "singleChat",
        time: Date.now(),
        status: "read",
        bySelf: true,
        modifiedInfo: {},
      }}
    ></TextMessage>
  );

  let MsgList = (
    <MessageList renderMessage={(msg) => TxtMsg(msg)}></MessageList>
  );

  const [tab, setTab] = useState("chat");
  const changeTab = (tab: string) => {
    setTab(tab);
  };

  useEffect(() => {
    console.log("变化了 showThreadPanel");
  }, [thread.showThreadPanel]);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);

    const userId = urlParams.get("userId");
    const password = urlParams.get("password");

    console.log("urlParams", userId, password, urlParams);

    rootStore.client.open({
      user: userId,
      pwd: password,
    });

    eventHandler.addEventHandler("chatroom", {
      onError: (err) => {
        console.error(err);
      },
      recallMessage: {
        success: () => {
          toast.success("撤回成功");
        },
        error: (error) => {
          toast.error("撤回失败");
        },
      },
      reportMessage: {
        success: () => {
          toast.success("举报成功");
        },
        error: (error) => {
          toast.error("举报失败");
        },
      },
      sendMessage: {
        error: (error) => {
          if (error.type == 507) {
            toast.error("你已被禁言，无法发送消息");
          } else if (
            error.type == 602 &&
            error.message == "not in group or chatroom"
          ) {
            toast.error("消息发送失败，你已不在当前群组");
          }
        },
      },
    });
  }, []);

  const getRTCToken = (data: any) => {
    const { channel, chatUserId } = data;
    const agoraUId = "935243573";
    const url = `https://a41.chat.agora.io/token/rtc/channel/${channel}/agorauid/${agoraUId}?userAccount=${chatUserId}`;
    return axios
      .get(url)
      .then(function (response) {
        console.log("getRtctoken", response);
        return response.data;
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const handleClickCvs = (cvs: any) => {
    return () => {
      rootStore.conversationStore.setCurrentCvs({
        chatType: cvs.chatType,
        conversationId: cvs.conversationId,
        name: cvs.name,
        unreadCount: 0,
      });
    };
  };

  const [contactData, setContactData] = useState({
    id: "",
    name: "",
    type: "contact",
  });

  // create group
  const [userSelectVisible, setUserSelectVisible] = useState(false);
  const [selectedUsers, setSelectedUsers] = useState<any[]>([]);

  const [groupSettingVisible, setGroupSettingVisible] = useState(false);
  const [cvsItem, setCvsItem] = useState<any>([]);
  const showGroupSetting = () => {
    setGroupSettingVisible((value) => !value);
    console.log("showGroupSetting");
  };

  const [forwardVisible, setForwardVisible] = useState(false);
  const [combineMsg, setCombineMsg] = useState({});

  const [addContactVisible, setAddContactVisible] = useState(false);

  useEffect(() => {
    if (cvsItem.conversationId !== rootStore.conversationStore.currentCvs) {
      setCvsItem(rootStore.conversationStore.currentCvs);
      setGroupSettingVisible(false);
    }
  }, [rootStore.conversationStore.currentCvs]);

  const [userId, setUserId] = useState("");
  const handleUserIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);
    setUserId(e.target.value);
  };

  const isInGroup = rootStore.addressStore.groups.some((item) => {
    // @ts-ignore
    return item.groupid == cvsItem.conversationId;
  });
  return (
    <>
      <AppRoutes></AppRoutes>
    </>
  );
};

export default observer(ChatApp);
