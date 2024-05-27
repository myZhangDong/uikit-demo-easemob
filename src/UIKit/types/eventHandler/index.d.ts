import { ChatSDK } from '../module/SDK';
export declare type EventName = 'joinChatRoom' | 'leaveChatRoom' | 'reportMessage' | 'getChatRoomDetails' | 'sendMessage' | 'fetchUserInfoById' | 'translateMessage' | 'recallMessage' | 'deleteConversation' | 'modifyMessage' | 'createChatThread' | 'destroyChatThread' | 'leaveChatThread' | 'setGroupMemberAttributes' | 'muteChatRoomMember' | 'getChatRoomMutelist' | 'unmuteChatRoomMember' | 'removeChatRoomMember' | 'getSilentModeForConversations' | 'setSilentModeForConversation' | 'clearRemindTypeForConversation' | 'getGroupInfo' | 'modifyGroup' | 'destroyGroup' | 'leaveGroup' | 'createGroup' | 'inviteToGroup' | 'removeGroupMembers' | 'changeGroupOwner' | 'pinConversation' | 'getServerPinnedConversations' | 'removeHistoryMessages' | 'addReaction' | 'deleteReaction' | 'getReactionDetail' | 'joinChatThread' | 'getChatThreads' | 'getChatThreadLastMessage' | 'getAllContacts' | 'getJoinedGroups' | 'open' | 'setContactRemark' | 'addContact' | 'deleteContact';
export declare type EventHandlerData = {
    [key in EventName]?: {
        success?: () => void;
        error?: (err: ChatSDK.ErrorEvent) => void;
    };
} & {
    onError: (err: ChatSDK.ErrorEvent) => void;
};
export declare class EventHandler {
    handlerData: {
        [key: string]: EventHandlerData;
    };
    private static instance;
    static getInstance(): EventHandler;
    constructor();
    addEventHandler(eventHandlerId: string, eventHandler: EventHandlerData): void;
    removeEventHandler(eventHandlerId: string): void;
    dispatchSuccess(eventName: EventName): void;
    dispatchError(eventName: EventName, error: ChatSDK.ErrorEvent): void;
}
export declare const eventHandler: EventHandler;
