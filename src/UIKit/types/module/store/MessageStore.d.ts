import { ChatSDK } from '../SDK';
import { CurrentConversation } from './ConversationStore';
import type { ReactionData } from '../reaction/ReactionMessage';
import { RootStore } from './index';
import { BaseMessageType } from '../baseMessage/BaseMessage';
export interface RecallMessage {
    type: 'recall';
    [key: string]: any;
}
export interface Message {
    singleChat: {
        [key: string]: (ChatSDK.MessageBody | RecallMessage)[];
    };
    groupChat: {
        [key: string]: (ChatSDK.MessageBody | RecallMessage)[];
    };
    chatRoom: {
        [key: string]: (ChatSDK.MessageBody | RecallMessage)[];
    };
    byId: {
        [key: string]: ChatSDK.MessageBody | RecallMessage;
    };
    broadcast: ChatSDK.MessageBody[];
}
export interface SelectedMessage {
    singleChat: {
        [key: string]: {
            selectable: boolean;
            selectedMessage: (ChatSDK.MessageBody | RecallMessage)[];
        };
    };
    groupChat: {
        [key: string]: {
            selectable: boolean;
            selectedMessage: (ChatSDK.MessageBody | RecallMessage)[];
        };
    };
}
export interface Typing {
    [key: string]: boolean;
}
declare class MessageStore {
    rootStore: RootStore;
    message: Message;
    selectedMessage: SelectedMessage;
    currentCVS: CurrentConversation;
    repliedMessage: ChatSDK.MessageBody | null;
    typing: Typing;
    holding: boolean;
    unreadMessageCount: number;
    constructor(rootStore: RootStore);
    get currentCvsMsgs(): (ChatSDK.MessageBody | RecallMessage)[];
    setCurrentCVS(currentCVS: CurrentConversation): void;
    sendMessage(message: ChatSDK.MessageBody | ChatSDK.ReadMsgBody | ChatSDK.DeliveryMsgBody | ChatSDK.ChannelMsgBody): Promise<void>;
    receiveMessage(message: BaseMessageType): void;
    modifyMessage(id: string, message: ChatSDK.MessageBody | RecallMessage): void;
    sendChannelAck(cvs: CurrentConversation): Promise<ChatSDK.SendMsgResult>;
    updateMessageStatus(msgId: string, status: string): void;
    addHistoryMsgs(cvs: CurrentConversation, msgs: any): void;
    clearMessage(cvs: CurrentConversation): void;
    setRepliedMessage(message: ChatSDK.MessageBody | null): void;
    deleteMessage(cvs: CurrentConversation, messageId: string | string[]): void | Promise<void>;
    recallMessage(cvs: CurrentConversation, messageId: string, isChatThread?: boolean, recallMySelfMsg?: boolean): Promise<void> | undefined;
    addReaction(cvs: CurrentConversation, messageId: string, emoji: string): Promise<void> | undefined;
    deleteReaction(cvs: CurrentConversation, messageId: string, emoji: string): Promise<void>;
    updateReactions(cvs: CurrentConversation, messageId: string, reactions: ReactionData[]): void;
    getReactionUserList(cvs: CurrentConversation, messageId: string, reaction: string): Promise<void> | undefined;
    translateMessage(cvs: CurrentConversation, messageId: string, language: string): Promise<unknown>;
    modifyLocalMessage(messageId: string, msg: ChatSDK.TextMsgBody, isReceivedModify?: boolean): void;
    modifyServerMessage(messageId: string, msg: ChatSDK.ModifiedMsg): Promise<void>;
    setSelectedMessage(cvs: CurrentConversation, selectedData: {
        selectable: boolean;
        selectedMessage: (ChatSDK.MessageBody | RecallMessage)[];
    }): void;
    setTyping(cvs: CurrentConversation, typing: boolean): void;
    sendTypingCmd(cvs: CurrentConversation): void;
    setHoldingStatus(status: boolean): void;
    setUnreadMessageCount(count: number): void;
    shiftBroadcastMessage(): void;
    sendReadAck(messageId: string, to: string): void;
    clear(): void;
}
export default MessageStore;
