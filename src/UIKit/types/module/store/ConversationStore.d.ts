import { ChatType } from '../types/messageType';
import { ChatSDK } from '../SDK';
export declare type AT_TYPE = 'NONE' | 'ALL' | 'ME';
export interface Conversation {
    chatType: ChatType;
    conversationId: string;
    lastMessage: Exclude<ChatSDK.MessageBody, ChatSDK.ReadMsgBody | ChatSDK.DeliveryMsgBody>;
    unreadCount: number;
    name?: string;
    atType?: AT_TYPE;
    isOnline?: boolean;
    avatarUrl?: string;
    isPinned?: boolean;
    silent?: boolean;
}
export interface CurrentConversation {
    conversationId: string;
    chatType: ChatType;
    name?: string;
    unreadCount?: number;
}
export interface ById {
    [key: string]: Conversation;
}
declare class ConversationStore {
    rootStore: any;
    currentCvs: CurrentConversation;
    conversationList: Conversation[];
    searchList: Conversation[];
    hasConversationNext: boolean;
    byId: ById;
    constructor(rootStore: any);
    setCurrentCvs: (currentCvs: CurrentConversation) => void;
    setConversation(conversations: Conversation[]): void;
    addConversation(conversation: Conversation): void;
    setSearchList(conversations: Conversation[]): void;
    deleteConversation(conversation: CurrentConversation): void;
    modifyConversation(conversation: Conversation): void;
    topConversation(conversation: Conversation): void;
    getConversation(chatType: ChatType, cvsId: string): undefined;
    setAtType(chatType: ChatType, cvsId: string, atType: AT_TYPE): void;
    setHasConversationNext(hasNext: boolean): void;
    updateConversationName(chatType: ChatType, cvsId: string): void;
    sortConversationList(): void;
    pinConversation(chatType: ChatType, cvsId: string, isPinned: boolean): void;
    getServerPinnedConversations(): void;
    setSilentModeForConversationSync(cvs: CurrentConversation, result: boolean): void;
    setSilentModeForConversation(cvs: CurrentConversation): void;
    clearRemindTypeForConversation(cvs: CurrentConversation): void;
    getSilentModeForConversations(cvs: CurrentConversation[]): void;
    setOnlineStatus(result: ChatSDK.SubscribePresence[]): void;
    clear(): void;
}
export default ConversationStore;
