declare const useChatContext: () => {
    messages: import("..").Message;
    repliedMessage: import("agora-chat").AgoraChat.ReadMsgBody | import("agora-chat").AgoraChat.DeliveryMsgBody | import("agora-chat").AgoraChat.ChannelMsgBody | import("agora-chat").AgoraChat.TextMsgBody | import("agora-chat").AgoraChat.CmdMsgBody | import("agora-chat").AgoraChat.CustomMsgBody | import("agora-chat").AgoraChat.LocationMsgBody | import("agora-chat").AgoraChat.ImgMsgBody | import("agora-chat").AgoraChat.AudioMsgBody | import("agora-chat").AgoraChat.VideoMsgBody | import("agora-chat").AgoraChat.FileMsgBody | import("agora-chat").AgoraChat.CombineMsgBody | null;
    typing: import("..").Typing;
    sendMessage: (message: import("agora-chat").AgoraChat.MessageBody) => Promise<void>;
    deleteMessage: (cvs: import("..").CurrentConversation, messageId: string | string[]) => void | Promise<void>;
    recallMessage: (cvs: import("..").CurrentConversation, messageId: string, isChatThread?: boolean, recallMySelfMsg?: boolean) => Promise<void> | undefined;
    addReaction: (cvs: import("..").CurrentConversation, messageId: string, emoji: string) => Promise<void> | undefined;
    deleteReaction: (cvs: import("..").CurrentConversation, messageId: string, emoji: string) => Promise<void>;
    translateMessage: (cvs: import("..").CurrentConversation, messageId: string, language: string) => Promise<unknown>;
    modifyMessage: (messageId: string, msg: import("agora-chat").AgoraChat.TextMsgBody) => Promise<void>;
    modifyLocalMessage: (id: string, message: import("agora-chat").AgoraChat.MessageBody | import("..").RecallMessage) => void;
    updateMessageStatus: (msgId: string, status: string) => void;
    sendTypingCommand: (cvs: import("..").CurrentConversation) => void;
    setRepliedMessage: (message: import("agora-chat").AgoraChat.MessageBody | null) => void;
    clearMessages: (cvs: import("..").CurrentConversation) => void;
};
export { useChatContext };
