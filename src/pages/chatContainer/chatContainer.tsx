import {
  useState,
  useRef,
  forwardRef,
  useImperativeHandle,
  useEffect,
  useContext,
} from "react";
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
  RootContext,
} from "easemob-chat-uikit";
import toast from "../../components/toast/toast";
import { APP_ID, appKey } from "../../config";
import { getRtcToken, getRtcChannelMembers } from "../../service/rtc";
import { getGroupAvatar } from "../../service/avatar";
import UserInviteModal from "../../components/userInviteModal/userInviteModal";
import "./chatContainer.scss";
import UserInfo from "../../components/userInfo/userInfo";
import { observer } from "mobx-react-lite";
import { useAppSelector, useAppDispatch } from "../../hooks";
import CreateChat from "./createChat";
import classNames from "classnames";
import i18next from "../../i18n";
import { current } from "@reduxjs/toolkit";
import { set } from "mobx";
const ChatContainer = forwardRef((props, ref) => {
  const appConfig = useAppSelector((state) => state.appConfig);
  const [userSelectVisible, setUserSelectVisible] = useState(false); // 是否显示创建群组弹窗
  const [addContactVisible, setAddContactVisible] = useState(false); //是否显示添加联系人弹窗
  const [conversationDetailVisible, setConversationDetailVisible] =
    useState(false); //是否显示群组设置/联系人详情弹窗
  const [selectedUsers, setSelectedUsers] = useState<any[]>([]);
  const [cvsItem, setCvsItem] = useState<any>([]);
  const [combineMsg, setCombineMsg] = useState({});
  const [forwardVisible, setForwardVisible] = useState(false); // 是否显示单条消息转发弹窗
  const [userInviteModalVisible, setUserInviteModalVisible] = useState(false); // 是否显示音视频邀请人员弹窗
  const [agoraUuId, setAgoraUuId] = useState<string>(""); // 当前用户的音视频时的agoraUid
  const [joinedRtcRoomUsers, setJoinedRtcRoomUsers] = useState<
    { userId: string }[]
  >([]); // 已加入音视频房间的用户
  const [userId, setUserId] = useState(""); // 要添加联系人的userId
  const [rtcGroupId, setRtcGroupId] = useState(""); // 当前音视频房间的groupId

  const context = useContext(RootContext);
  const { theme } = context;
  const themeMode = theme?.mode;
  console.log("context >>>", context);
  const handleUserIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);
    setUserId(e.target.value);
  };

  const isInGroup = rootStore.addressStore.groups.some((item) => {
    // @ts-ignore
    return item.groupid == cvsItem.conversationId;
  });
  const handleEllipsisClick = () => {
    if (cvsItem.chatType == "groupChat") {
      isInGroup && setConversationDetailVisible((value) => !value);
    } else {
      setConversationDetailVisible((value) => !value);
    }
  };

  const handleGetIdMap = (data: { userId: string; channel: string }) => {
    console.log("获取房间成员", data);
    return getRtcChannelMembers({
      username: data.userId,
      channelName: data.channel,
      appKey: appKey,
    }).then((res) => {
      console.log("获取房间成员成功", res);
      return res;
    });
  };

  const handleRtcStateChange = (state: any) => {
    console.log("handleRtcStateChange", state);
  };

  const getRtcToken2 = (data: {
    channel: string | number;
    chatUserId: string;
  }) => {
    console.log("获取token >>", data);
    return getRtcToken({
      channelName: data.channel,
      username: data.chatUserId,
      appKey: appKey,
    }).then((res) => {
      console.log("获取token成功", res);
      const { agoraUserId, accessToken } = res;
      setAgoraUuId(String(agoraUserId));
      return {
        agoraUid: agoraUserId,
        accessToken,
      };
    });
  };

  const [mediaType, setMediaType] = useState<"audio" | "video">("audio");
  const handleInviteUser = (data: any) => {
    console.log("handleInviteToCall", data);
    setMediaType(data.type);
    setRtcGroupId(data.conversation.conversationId);

    setUserInviteModalVisible(true);
    // getGroupMembers(data.conversation.conversationId)
    setJoinedRtcRoomUsers([{ userId: rootStore.client.user }]);
    return new Promise((resolve, reject) => {
      _resolve.current = resolve;
    });
  };

  const handleRing = (data: any) => {
    console.log("handleRing", data);
    if (data.type === 2 || data.type === 3) {
      let groupAvatarUrl = rootStore.addressStore.groups.find(
        (item: any) => item.groupid === data.groupId
      )?.avatarUrl;
      setGroupAvatar(groupAvatarUrl || "");
    }
  };

  let _resolve = useRef<any>(null);
  const thread = rootStore.threadStore;

  const chatRef = useRef<any>(null);

  useImperativeHandle(ref, () => ({
    startVideoCall: chatRef.current.startVideoCall,
    startAudioCall: chatRef.current.startAudioCall,
  }));

  useEffect(() => {
    if (rootStore.loginState) {
      console.log("群组数据", rootStore.addressStore.groups);

      const groupIds =
        rootStore.addressStore.groups
          .filter((item) => !item.avatarUrl)
          .map((item) => {
            //@ts-ignore
            return item.groupid;
          }) || [];
      getGroupAvatar(groupIds).then((res) => {
        console.log("getGroupAvatar success", res);
        for (let groupId in res) {
          rootStore.addressStore.updateGroupAvatar(groupId, res[groupId]);
        }
      });
    }
  }, [rootStore.loginState, rootStore.addressStore.groups.length]);

  // --- 创建会话 ---
  const [createChatVisible, setCreateChatVisible] = useState(false);
  let [groupAvatar, setGroupAvatar] = useState("");
  useEffect(() => {
    setConversationDetailVisible(false);
    setCvsItem(rootStore.conversationStore.currentCvs);

    if (rootStore.conversationStore.currentCvs.chatType === "groupChat") {
      let groupAvatarUrl = rootStore.addressStore.groups.find(
        (item: any) =>
          item.groupid === rootStore.conversationStore.currentCvs.conversationId
      )?.avatarUrl;
      setGroupAvatar(groupAvatarUrl || "");
    }
  }, [rootStore.conversationStore.currentCvs]);

  return (
    <div
      className={classNames("chat-container", {
        "chat-container-dark": themeMode === "dark",
      })}
    >
      <div className="chat-container-conversation">
        <ConversationList
          renderHeader={() => (
            <Header
              moreAction={{
                visible: true,
                icon: (
                  <Icon
                    type="PLUS_IN_CIRCLE"
                    width={24}
                    height={24}
                    color={themeMode == "dark" ? "#C8CDD0" : "#464E53"}
                  />
                ),
                actions: [
                  {
                    content: i18next.t("createConversation"),
                    onClick: () => {
                      console.log("create group");
                      setCreateChatVisible(true);
                    },
                  },
                  {
                    content: i18next.t("addContact"),
                    onClick: () => {
                      setAddContactVisible(true);
                      // setUserSelectVisible(true);
                    },
                  },
                  {
                    content: i18next.t("createGroup"),
                    onClick: () => {
                      console.log("create group");
                      setUserSelectVisible(true);
                    },
                  },
                ],
              }}
              content={<div className="header-content">Chats</div>}
              avatar={<></>}
            ></Header>
          )}
          onItemClick={(item) => {
            console.log("cvsItem", item);
            setConversationDetailVisible(false);
            setCvsItem(item);
          }}
          className="conversation-list"
        ></ConversationList>
      </div>

      <div className="chat-container-chat">
        <div
          style={{
            display: "flex",
            flex: 1,
            borderLeft: "1px solid transparent",
            overflow: "hidden",
          }}
        >
          {createChatVisible && (
            <CreateChat
              onClosed={() => {
                setCreateChatVisible(false);
              }}
            />
          )}
          <Chat
            ref={chatRef}
            messageListProps={{
              renderUserProfile: () => {
                return null;
              },
              messageProps: {
                // @ts-ignore
                onForwardMessage: (msg: any) => {
                  let forwardMsg = { ...msg };
                  // @ts-ignore
                  forwardMsg.id = Date.now() + "";
                  // @ts-ignore
                  forwardMsg.from = rootStore.client.user;
                  // @ts-ignore
                  forwardMsg.ext = {
                    ease_chat_uikit_user_info: {
                      nickname:
                        rootStore.addressStore.appUsersInfo[
                          rootStore.client.user
                        ].nickname,
                      avatarURL:
                        rootStore.addressStore.appUsersInfo[
                          rootStore.client.user
                        ].avatarurl,
                    },
                  };
                  // @ts-ignore
                  forwardMsg.reactions = undefined;
                  // @ts-ignore
                  forwardMsg.isChatThread = false;
                  forwardMsg.chatThreadOverview = undefined;
                  forwardMsg.chatThread = undefined;
                  console.log("onForwardMessage --", forwardMsg);
                  setCombineMsg(forwardMsg);
                  setForwardVisible(true);
                },
                reaction: appConfig.reaction,
                thread: appConfig.thread,
                customAction: {
                  visible: true,
                  icon: null,
                  actions: [
                    {
                      content: "REPLY",
                      onClick: () => {},
                    },
                    {
                      content: "DELETE",
                      onClick: () => {},
                    },
                    {
                      content: "UNSEND",
                      onClick: () => {},
                    },
                    {
                      visible: appConfig.translation,
                      content: "TRANSLATE",
                      onClick: () => {},
                    },
                    {
                      content: "Modify",
                      onClick: () => {},
                    },
                    {
                      content: "SELECT",
                      onClick: () => {},
                    },
                    {
                      content: "FORWARD",
                      onClick: () => {},
                    },
                    {
                      content: "REPORT",
                      onClick: () => {},
                    },
                  ],
                },
              },
            }}
            messageInputProps={{
              enabledTyping: true,
              onSendMessage: (msg) => {
                console.log("message", msg);
                if (msg.type == "combine") {
                  setCombineMsg(msg);
                  setForwardVisible(true);
                }
              },
            }}
            headerProps={{
              moreAction: {
                visible: true,
                actions: [],
              },
              onClickEllipsis: handleEllipsisClick,
            }}
            rtcConfig={{
              // @ts-ignore
              onInvite: handleInviteUser,

              onRing: handleRing,
              agoraUid: agoraUuId,
              getIdMap: handleGetIdMap,
              onStateChange: handleRtcStateChange,
              appId: APP_ID,
              getRTCToken: getRtcToken2,
              //@ts-ignore
              onAddPerson: (data: any) => {
                console.log("onAddPerson", data);
                setMediaType(data.type === 2 ? "video" : "audio");
                setRtcGroupId(data.groupId);
                setUserInviteModalVisible(true);
                const joinedUsers = data.joinedMembers.map(
                  (item: { agoraUid: number; imUserId: string }) => {
                    return { userId: item.imUserId };
                  }
                );
                setJoinedRtcRoomUsers(joinedUsers);
                return new Promise((resolve) => {
                  _resolve.current = resolve;
                });
              },
              groupAvatar: groupAvatar,
            }}
          ></Chat>

          {/** 是否显示群组设置 */}
          {conversationDetailVisible && (
            <div style={{ width: "350px", borderLeft: "1px solid green" }}>
              {cvsItem.chatType == "groupChat" ? (
                <GroupDetail
                  conversation={{
                    chatType: "groupChat",
                    conversationId: cvsItem.conversationId,
                  }}
                  onLeaveGroup={() => {
                    setConversationDetailVisible(false);
                  }}
                  onDestroyGroup={() => {
                    setConversationDetailVisible(false);
                  }}
                  // @ts-ignore
                  groupMemberProps={{
                    onPrivateChat: () => {
                      setConversationDetailVisible(false);
                    },
                    onAddContact: () => {
                      toast.success("已发送申请");
                    },
                  }}
                  onUserIdCopied={() => {
                    toast.success("已复制");
                  }}
                ></GroupDetail>
              ) : (
                <UserInfo conversation={cvsItem}></UserInfo>
              )}
            </div>
          )}
        </div>
        {/** 是否显示子区 */}
        {thread.showThreadPanel && (
          <div
            style={{
              width: "350px",
              borderLeft: "1px solid #eee",
              overflow: "hidden",
              background: "#fff",
            }}
          >
            <Thread
              messageListProps={{
                renderUserProfile: () => null,
                messageProps: {
                  // @ts-ignore
                  onForwardMessage: (msg: { [key: string]: any }) => {
                    console.log("onForwardMessage --", msg);
                    let forwardMsg = { ...msg };
                    // @ts-ignore
                    forwardMsg.id = Date.now() + "";
                    // @ts-ignore
                    forwardMsg.from = rootStore.client.user;
                    // @ts-ignore
                    forwardMsg.ext = {
                      ease_chat_uikit_user_info: {
                        nickname:
                          rootStore.addressStore.appUsersInfo[
                            rootStore.client.user
                          ].nickname,
                        avatarURL:
                          rootStore.addressStore.appUsersInfo[
                            rootStore.client.user
                          ].avatarurl,
                      },
                    };
                    // @ts-ignore
                    forwardMsg.reactions = undefined;
                    // @ts-ignore
                    forwardMsg.isChatThread = false;
                    forwardMsg.chatThreadOverview = undefined;
                    forwardMsg.chatThread = undefined;
                    setCombineMsg(forwardMsg);
                    setForwardVisible(true);
                  },
                  customAction: {
                    visible: true,
                    icon: null,
                    actions: [
                      {
                        content: "REPLY",
                        onClick: () => {},
                      },

                      {
                        content: "TRANSLATE",
                        onClick: () => {},
                      },
                      {
                        content: "Modify",
                        onClick: () => {},
                      },
                      {
                        content: "SELECT",
                        onClick: () => {},
                      },
                      {
                        content: "FORWARD",
                        onClick: () => {},
                      },
                    ],
                  },
                },
              }}
              messageInputProps={{
                onSendMessage: (msg: any) => {
                  console.log("message", msg);
                  if (msg.type == "combine") {
                    setCombineMsg(msg);
                    setForwardVisible(true);
                  }
                },
                // enabledTyping: state?.typingSwitch,
              }}
            ></Thread>
          </div>
        )}
      </div>
      {/** 创建群组的联系人弹窗 */}
      <UserSelect
        onCancel={() => {
          setUserSelectVisible(false);
        }}
        onOk={() => {
          rootStore.addressStore.createGroup(
            selectedUsers.map((user) => user.userId)
          );
          setUserSelectVisible(false);
        }}
        enableMultipleSelection
        onUserSelect={(user, users) => {
          setSelectedUsers(users);
        }}
        open={userSelectVisible}
      ></UserSelect>
      {/** 转发消息的联系人弹窗 */}
      <Modal
        open={forwardVisible}
        closable={false}
        onCancel={() => {
          setForwardVisible(false);
        }}
        bodyStyle={{ padding: 0 }}
        footer={null}
      >
        <div style={{ height: "600px" }}>
          <ContactList
            style={{ padding: "24px" }}
            menu={["groups", "contacts"]}
            header={<></>}
            onItemClick={(data) => {
              console.log("data", data);
              // @ts-ignore
              combineMsg.to = data.id;
              // @ts-ignore
              combineMsg.chatType =
                data.type == "contact" ? "singleChat" : "groupChat";
              console.log("combineMsg ---", combineMsg);
              rootStore.messageStore.sendMessage(combineMsg);
              setForwardVisible(false);

              // rootStore.conversationStore.topConversation({
              //   chatType: data.type == "contact" ? "singleChat" : "groupChat",
              //   conversationId: data.id,
              //   //@ts-ignore
              //   lastMessage: combineMsg,
              // })
              console.log("cvs-----", cvsItem);
              rootStore.messageStore.setSelectedMessage(cvsItem, {
                selectable: false,
                selectedMessage: [],
              });
              rootStore.conversationStore.setCurrentCvs({
                chatType: data.type == "contact" ? "singleChat" : "groupChat",
                conversationId: data.id,
                //@ts-ignore
                lastMessage: combineMsg,
              });
            }}
          ></ContactList>
        </div>
      </Modal>
      {/** 添加联系人弹窗 */}
      <Modal
        open={addContactVisible}
        onCancel={() => {
          setAddContactVisible(false);
        }}
        onOk={() => {
          rootStore.addressStore.addContact(userId);
          setAddContactVisible(false);
        }}
        closable={false}
        title={i18next.t("addContact")}
      >
        <>
          <div className="add-contact">
            userId:{" "}
            <Input
              className="add-contact-input"
              onChange={handleUserIdChange}
            ></Input>
          </div>
        </>
      </Modal>
      {/** 音视频邀请用户组件 */}
      <UserInviteModal
        title={
          mediaType === "audio"
            ? i18next.t("audioCall")
            : i18next.t("videoCall")
        }
        visible={userInviteModalVisible}
        groupId={rtcGroupId}
        onClose={() => {
          setUserInviteModalVisible(false);
        }}
        onInvite={(users) => {
          console.log("users >>", users);
          _resolve.current(users);
          setUserInviteModalVisible(false);
        }}
        checkedUsers={joinedRtcRoomUsers}
      ></UserInviteModal>
    </div>
  );
});

export default observer(ChatContainer);
