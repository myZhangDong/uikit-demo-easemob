declare const useAddressContext: () => {
    appUsersInfo: Record<string, import("..").AppUserInfo>;
    groups: import("..").GroupItem[];
    setAppUserInfo: (appUsersInfo: Record<string, import("..").AppUserInfo>) => void;
    setGroups: (groups: import("..").GroupItem[]) => void;
    updateGroupName: (groupId: string, groupName: string) => void;
    setGroupMembers: (groupId: string, membersList: import("agora-chat").AgoraChat.GroupMember[]) => void;
    removeGroupMember: (groupId: string, userId: string) => void;
    setGroupMemberAttributes: (groupId: string, userId: string, attributes: import("agora-chat").AgoraChat.MemberAttributes) => void;
    setGroupAdmins: (groupId: string, admins: string[]) => void;
    getGroupMembers: (groupId: string, withUserInfo: boolean) => Promise<void> | undefined;
};
export { useAddressContext };
