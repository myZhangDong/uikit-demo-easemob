import React, { useEffect, useState } from "react";
import { Modal, UserSelect, rootStore } from "easemob-chat-uikit";
import toast from "react-hot-toast";
const ALLOW_MAX_USER = 16;
interface UserInviteModalProps {
  onClose?: () => void;
  onInvite?: (
    userId: { name: string; id: string; avatarurl?: string }[]
  ) => void;
  visible: boolean;
  checkedUsers?: UserInfo[];
  groupId: string;
}
interface UserInfo {
  avatarUrl?: string;
  nickname?: string;
  userId: string;
  attributes?: {
    nickName?: string;
    avatarurl?: string;
  };
}
const UserInviteModal = (props: UserInviteModalProps) => {
  const { visible, onInvite, onClose, checkedUsers = [], groupId } = props;
  const [selectedUsers, setSelectedUsers] = useState<UserInfo[]>([]);
  const [users, setUsers] = useState<UserInfo[]>([]);
  const [disabled, setDisabled] = useState(false);
  const getGroupMembers = (groupId: string) => {
    const rtcGroup = rootStore.addressStore.groups.filter((item) => {
      // @ts-ignore
      return item.groupid == groupId;
    });
    if (rtcGroup.length > 0) {
      const members = rtcGroup[0]?.members?.map((item) => {
        const member = { ...item };
        if (!item?.attributes?.nickName) {
          if (!member.attributes) {
            member.attributes = {};
          }
          member.attributes.nickName =
            rootStore.addressStore.appUsersInfo[item.userId]?.nickname;
        }
        if (!item?.attributes?.avatarurl) {
          member.attributes.avatarurl =
            rootStore.addressStore.appUsersInfo[item.userId]?.avatarurl;
        }
        return member;
      });
      setUsers(members as any as UserInfo[]);
    }
  };
  useEffect(() => {
    getGroupMembers(groupId);
  }, [groupId]);

  console.log("checkedUsers", checkedUsers);
  return (
    <UserSelect
      title="音频通话"
      onCancel={() => {
        onClose?.();
      }}
      onOk={() => {
        let contacts =
          selectedUsers.length > 0
            ? selectedUsers.map((item) => {
                return {
                  id: item.userId,
                  name: item?.attributes?.nickName || item.userId,
                  avatarurl: item?.attributes?.avatarurl,
                };
              })
            : [];
        console.log("contacts", contacts);
        onInvite?.(contacts);
      }}
      enableMultipleSelection
      onUserSelect={(user, users) => {
        if (users.length >= ALLOW_MAX_USER) {
          setDisabled(true);
        }
        setSelectedUsers(users as any);
      }}
      users={users}
      checkedUsers={checkedUsers}
      open={visible}
      disabled={disabled}
    ></UserSelect>
  );
};

export default UserInviteModal;
