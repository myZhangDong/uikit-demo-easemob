declare const useContacts: () => {
    userId: string;
    nickname: string;
}[];
declare const useUserInfo: (userList: 'conversation' | 'contacts', withPresence?: boolean) => void;
declare const useGroups: () => {
    getJoinedGroupList: () => void;
};
declare const useGroupMembers: (groupId: string, withUserInfo: boolean) => {
    getGroupMemberList?: undefined;
} | {
    getGroupMemberList: () => Promise<void> | undefined;
};
declare const useGroupMembersAttributes: (groupId: string, userIds: string[], attributesKeys?: string[]) => {
    getMemberAttributes: () => void;
};
declare const useGroupAdmins: (groupId: string) => {
    getGroupAdmins: () => void;
};
export { useContacts, useGroups, useUserInfo, useGroupMembers, useGroupAdmins, useGroupMembersAttributes, };
