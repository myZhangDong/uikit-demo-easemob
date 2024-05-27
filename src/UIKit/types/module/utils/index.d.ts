import { ChatType } from '../types/messageType';
import { ChatSDK } from '../SDK';
import type { RecallMessage } from '../store/MessageStore';
import { GroupItem, MemberItem } from '../store/AddressStore';
import { AppUserInfo } from '../store/AddressStore';
import { CurrentConversation } from '../store/ConversationStore';
import type { BaseMessageType } from '../baseMessage/BaseMessage';
export declare function getConversationTime(time: number): string | undefined;
export declare function parseChannel(channelId: string): {
    chatType: ChatType;
    conversationId: string;
};
export declare function getCvsIdFromMessage(message: BaseMessageType | RecallMessage): string;
export declare function getEmojiHtml({ src, dataKey, alt }: {
    src?: string | undefined;
    dataKey?: string | undefined;
    alt?: string | undefined;
}): string;
export declare const renderHtml: (txt: string) => string;
export declare function getUsersInfo(props: {
    userIdList: string[];
    withPresence?: boolean;
}): Promise<unknown>;
export declare const formatHtmlString: (str: string) => string;
export declare function getGroupItemFromGroupsById(groupId: string): GroupItem | undefined;
export declare function getGroupItemIndexFromGroupsById(groupId: string): number;
export declare function getGroupMemberIndexByUserId(group: GroupItem, userId: string): number | undefined;
export declare function getGroupMemberNickName(member: MemberItem): any;
export declare function getAppUserInfo(userId: string): AppUserInfo;
export declare function getMessages(cvs: CurrentConversation): (ChatSDK.MessageBody | RecallMessage)[];
export declare function getMessageIndex(messages: (ChatSDK.MessageBody | RecallMessage)[], messageId: string): number;
export declare function getReactionByEmoji(message: ChatSDK.MessageBody | RecallMessage, emoji: string): any;
export declare const getMsgSenderNickname: (msg: BaseMessageType, parentId?: string) => any;
export declare function sortByPinned(a: any, b: any): 0 | 1 | -1;
export declare function checkCharacter(character: string): "zh" | "en" | "unknown";
