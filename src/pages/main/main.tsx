import { useEffect, useState, FC, useRef } from "react";
import ReactDOM from "react-dom/client";
// import "./index.css";
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
import "./main.scss";
import { APP_ID, appKey } from "../../config";
import { getRtcToken, getRtcChannelMembers } from "../../service/rtc";
import UserInviteModal from "../../components/userInviteModal/userInviteModal";
import { set } from "mobx";
import NavigationBar from "./components/navigationBar/navigationBar";
// @ts-ignore
window.rootStore = rootStore;
const ChatApp: FC<any> = () => {
  const client = useClient();
  useEffect(() => {
    const webImAuth = sessionStorage.getItem("webImAuth");

    console.log("webImAuth", webImAuth);
    let webImAuthObj = {
      userId: "",
      password: "",
      chatToken: "",
    };
    if (webImAuth) {
      webImAuthObj = JSON.parse(webImAuth);
      if (webImAuthObj.password) {
        client.open({
          user: webImAuthObj.userId,
          pwd: webImAuthObj.password,
        });
      } else {
        console.log("webimAuthObj", webImAuthObj);
        client.open({
          user: webImAuthObj.userId,
          accessToken: webImAuthObj.chatToken,
        });
      }
    }
  }, [client]);

  let {
    topConversation: topConversationInner,
    currentConversation,
    conversationList,
    setCurrentConversation,
  } = useConversationContext();

  let { messages } = useChatContext();

  const thread = rootStore.threadStore;

  const [tab, setTab] = useState("chat");
  const changeTab = (tab: string) => {
    setTab(tab);
  };

  useEffect(() => {
    console.log("变化了 showThreadPanel");
  }, [thread.showThreadPanel]);

  useEffect(() => {
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
    isInGroup && setGroupSettingVisible((value) => !value);
    console.log("showGroupSetting");
  };

  const [forwardVisible, setForwardVisible] = useState(false);
  const [combineMsg, setCombineMsg] = useState({});
  const [agoraUuId, setAgoraUuId] = useState<string>("");
  const [addContactVisible, setAddContactVisible] = useState(false);
  console.log("agoraUid >>>>", agoraUuId);
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

  let _resolve = useRef<any>(null);
  const [rtcGroupId, setRtcGroupId] = useState("");
  const handleInviteUser = (data: any) => {
    console.log("handleInviteToCall", data);
    setRtcGroupId(data.conversation.conversationId);
    setUserInviteModalVisible(true);
    // getGroupMembers(data.conversation.conversationId)
    setJoinedRtcRoomUsers([{ userId: rootStore.client.user }]);
    return new Promise((resolve, reject) => {
      _resolve.current = resolve;
    });
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
  const [userInviteModalVisible, setUserInviteModalVisible] = useState(false);
  const [joinedRtcRoomUsers, setJoinedRtcRoomUsers] = useState<
    { userId: string }[]
  >([]);
  return (
    <div className="main-container">
      <div className="tab-box">
        <div
          className="tab-btn"
          onClick={() => {
            changeTab("chat");
          }}
        >
          chat
        </div>
        <div
          className="tab-btn"
          onClick={() => {
            changeTab("contact");
          }}
        >
          contact
        </div>
      </div>
      <div
        style={{
          width: "350px",
          background: "#fff",
        }}
      >
        {tab == "chat" && (
          <ConversationList
            renderHeader={() => (
              <Header
                moreAction={{
                  visible: true,
                  actions: [
                    {
                      content: "创建群组",
                      onClick: () => {
                        console.log("create group");
                        setUserSelectVisible(true);
                      },
                    },
                    {
                      content: "添加联系人",
                      onClick: () => {
                        setAddContactVisible(true);
                        // setUserSelectVisible(true);
                      },
                    },
                  ],
                }}
                content="测试demo"
                avatar={<></>}
              ></Header>
            )}
            onItemClick={(item) => {
              console.log("cvsItem", item);
              setGroupSettingVisible(false);
              setCvsItem(item);
            }}
            // itemProps={{
            //   moreAction: {
            //     visible: true,
            //     actions: [{ content: 'DELETE' }],
            //   },
            // }}
            className="conversation"
            // renderItem={csv => (
            //   <ConversationItem
            //     onClick={handleClickCvs(csv)}
            //     key={csv.conversationId}
            //     data={csv}
            //     // isActive
            //   />
            // )}
          ></ConversationList>
        )}

        {tab == "contact" && (
          //@ts-ignore
          <ContactList
            //@ts-ignore
            // className="conversation"
            onItemClick={(data) => {
              let type = data.type;
              // if (data.type == "request") {
              //   type = "contact";
              // }
              console.log("点击联系人", data);
              setContactData({
                id: data.id,
                name: data.name,
                type: type,
              });
            }}
          ></ContactList>
        )}
      </div>
      <div
        style={{
          flex: 1,
          overflow: "hidden",
          display: "flex",
        }}
      >
        <div
          style={{
            display: "flex",
            flex: 1,
            borderLeft: "1px solid transparent",
            overflow: "hidden",
          }}
        >
          {tab == "chat" && (
            <>
              <Chat
                messageListProps={{
                  renderUserProfile: () => {
                    return null;
                  },
                  messageProps: {
                    // @ts-ignore
                    onForwardMessage: (msg) => {
                      console.log("onForwardMessage --", msg);
                      // @ts-ignore
                      msg.id = Date.now() + "";
                      // @ts-ignore
                      msg.from = rootStore.client.user;
                      // @ts-ignore
                      msg.ext = {
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
                      setCombineMsg(msg);
                      setForwardVisible(true);
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
                  onClickEllipsis: showGroupSetting,
                  // cvsItem.chatType == "groupChat"
                  //   ? {
                  //       visible: false,
                  //       actions: [{ content: "" }],
                  //     }
                  //   : undefined,
                  // suffixIcon:
                  //   cvsItem.chatType == "groupChat" && isInGroup ? (
                  //     <Icon
                  //       type="ELLIPSIS"
                  //       width={24}
                  //       height={24}
                  //       onClick={showGroupSetting}
                  //     ></Icon>
                  //   ) : undefined,
                }}
                rtcConfig={{
                  // @ts-ignore
                  onInvite: handleInviteUser,
                  agoraUid: agoraUuId,
                  getIdMap: handleGetIdMap,
                  onStateChange: handleRtcStateChange,
                  appId: APP_ID,
                  getRTCToken: getRtcToken2,
                  //@ts-ignore
                  onAddPerson: (data: any) => {
                    console.log("onAddPerson", data);
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
                }}
              ></Chat>
              {groupSettingVisible && (
                <div style={{ width: "350px", borderLeft: "1px solid green" }}>
                  <GroupDetail
                    conversation={{
                      chatType: "groupChat",
                      conversationId: cvsItem.conversationId,
                    }}
                    onLeaveGroup={() => {
                      setGroupSettingVisible(false);
                    }}
                    onDestroyGroup={() => {
                      setGroupSettingVisible(false);
                    }}
                    // @ts-ignore
                    groupMemberProps={{
                      onPrivateChat: () => {
                        setGroupSettingVisible(false);
                      },
                      onAddContact: () => {
                        toast.success("已发送申请");
                      },
                    }}
                    onUserIdCopied={() => {
                      toast.success("已复制");
                    }}
                  ></GroupDetail>
                </div>
              )}
            </>
          )}
          {tab == "contact" && (
            <ContactDetail
              // @ts-ignore
              data={contactData}
              onMessageBtnClick={() => {
                setTab("chat");
              }}
            ></ContactDetail>
          )}
        </div>
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
                  onForwardMessage: (msg) => {
                    console.log("onForwardMessage --", msg);
                    // @ts-ignore
                    msg.id = Date.now() + "";
                    // @ts-ignore
                    msg.from = rootStore.client.user;
                    // @ts-ignore
                    msg.ext = {
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
                    setCombineMsg(msg);
                    setForwardVisible(true);
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
        {/* <div style={{ width: '350px', borderLeft: '1px solid green' }}>
          <GroupSetting
            conversation={{ chatType: 'groupChat', conversationId: contactData.id }}
          ></GroupSetting>
        </div> */}
      </div>

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
        title="添加联系人"
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
      <Toaster />
    </div>
  );
};

export default observer(ChatApp);
