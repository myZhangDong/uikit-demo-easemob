import React from 'react';
import { UserInfoData } from '../../component/userItem';
import { ModalProps } from '../../component/modal';
export interface UserSelectProps extends ModalProps {
    prefix?: string;
    className?: string;
    style?: React.CSSProperties;
    onUserSelect?: (user: UserSelectInfo & {
        type: 'add' | 'delete';
    }, userArr: UserSelectInfo[]) => void;
    enableMultipleSelection?: boolean;
    selectedPanelHeader?: React.ReactNode;
    selectedPanelFooter?: React.ReactNode;
    users?: UserSelectInfo[];
    checkedUsers?: UserSelectInfo[];
    disableUserIds?: string[];
    disabled?: boolean;
    searchPlaceholder?: string;
    onOk?: (selectedUsers: UserInfoData[]) => void;
}
export interface UserSelectInfo {
    avatarUrl?: string;
    nickname?: string;
    userId: string;
}
declare const UserSelect: React.FC<UserSelectProps>;
export default UserSelect;
