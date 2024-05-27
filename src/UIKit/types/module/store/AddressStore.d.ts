import { ChatSDK } from '../SDK';
export declare type MemberRole = 'member' | 'owner' | 'admin';
export interface ContactRequest {
    from: string;
    to: string;
    type: 'subscribe';
    status?: string;
    requestStatus: 'pending' | 'accepted' | 'read';
}
export interface MemberItem {
    userId: ChatSDK.UserId;
    role: MemberRole;
    attributes?: ChatSDK.MemberAttributes;
    silent?: boolean;
    initial?: string;
    name?: string;
}
export interface GroupItem extends ChatSDK.BaseGroupInfo {
    disabled?: boolean;
    info?: ChatSDK.GroupDetailInfo;
    members?: MemberItem[];
    hasMembersNext?: boolean;
    admins?: ChatSDK.UserId[];
    silent?: boolean;
    initial?: string;
    name?: string;
    avatarUrl?: string;
}
export declare type AppUserInfo = Partial<Record<ChatSDK.ConfigurableKey, any>> & {
    userId: string;
    isOnline?: boolean;
    presenceExt?: string;
};
export declare type ChatroomInfo = ChatSDK.GetChatRoomDetailsResult & {
    membersId?: string[];
    admins?: string[];
    muteList?: string[];
};
declare class AddressStore {
    appUsersInfo: Record<string, AppUserInfo>;
    contacts: {
        userId: string;
        nickname: string;
        silent?: boolean;
        remark?: string;
    }[];
    groups: GroupItem[];
    hasGroupsNext: boolean;
    chatroom: ChatroomInfo[];
    searchList: any;
    requests: ContactRequest[];
    thread: {
        [key: string]: ChatSDK.ThreadChangeInfo[];
    };
    constructor();
    setAppUserInfo: (appUsersInfo: Record<string, AppUserInfo>) => void;
    setContacts(contacts: any): void;
    setContactRemark(userId: string, remark: string): void;
    deleteContact(userId: string): void;
    deleteContactFromContactList(userId: string): void;
    addContactToContactList(userId: string): void;
    setGroups(groups: GroupItem[]): void;
    updateGroupAvatar(groupId: string, avatar: string): void;
    updateGroupName(groupId: string, groupName: string): void;
    setHasGroupsNext(hasNext: boolean): void;
    setGroupMembers(groupId: string, membersList: ChatSDK.GroupMember[]): void;
    removeGroupMember(groupId: string, userId: string): void;
    setGroupItemHasMembersNext(groupId: string, hasNext: boolean): void;
    setGroupMemberAttributesAsync: (groupId: string, userId: string, attributes: ChatSDK.MemberAttributes) => void;
    setGroupMemberAttributes(groupId: string, userId: string, attributes: ChatSDK.MemberAttributes): void;
    setGroupAdmins: (groupId: string, admins: string[]) => void;
    getUserInfo: (userId: string) => Promise<AppUserInfo>;
    getUserInfoWithPresence: (userIdList: string[]) => void;
    setChatroom(chatroom: any): void;
    setChatroomAdmins: (chatroomId: string, admins: string[]) => void;
    addUserToMuteList: (chatroomId: string, userId: string) => void;
    setChatroomMuteList: (chatroomId: string, muteList: string[]) => void;
    muteChatRoomMember: (chatroomId: string, userId: string, muteDuration?: number) => Promise<void>;
    getChatroomMuteList: (chatroomId: string) => Promise<void>;
    unmuteChatRoomMember: (chatroomId: string, userId: string) => Promise<void>;
    removeUserFromMuteList: (chatroomId: string, userId: string) => void;
    setChatroomMemberIds: (chatroomId: string, membersId: string[]) => void;
    removerChatroomMember: (chatroomId: string, userId: string) => void;
    setSearchList(searchList: any): void;
    getSilentModeForConversations(cvs: {
        conversationId: string;
        chatType: 'singleChat' | 'groupChat';
    }[]): void;
    setSilentModeForConversationSync(cvs: {
        conversationId: string;
        chatType: 'singleChat' | 'groupChat';
    }, silent: boolean): void;
    setSilentModeForConversation(cvs: {
        conversationId: string;
        chatType: 'singleChat' | 'groupChat';
    }, silent: boolean): void;
    getGroupInfo(groupId: string): void;
    modifyGroup(groupId: string, groupName: string, description: string): void;
    destroyGroup(groupId: string): void;
    leaveGroup(groupId: string): void;
    addContact(userId: string): void;
    addContactRequest(request: ContactRequest): void;
    acceptContactInvite(userId: string): void;
    readContactInvite(userId: string): void;
    createGroup(members: string[]): void;
    inviteToGroup(groupId: string, userIds: string[]): void;
    removeGroupMembers(groupId: string, userIds: string[]): void;
    setGroupOwner(groupId: string, userId: string): void;
    changeGroupOwner(groupId: string, newOwner: string): void;
    removeGroupFromContactList(groupId: string): void;
    clear(): void;
}
export default AddressStore;
