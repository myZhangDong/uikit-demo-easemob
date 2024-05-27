import React from 'react';
import { HeaderProps } from '../header';
import { UserInfoData, UserItemProps } from '../../component/userItem';
import { UserSelectInfo } from '../userSelect';
export interface GroupMemberProps {
    style?: React.CSSProperties;
    className?: string;
    prefix?: string;
    headerProps?: HeaderProps;
    onItemClick?: (info: {
        id: string;
        type: 'contact' | 'group';
        name: string;
    }) => void;
    checkable?: boolean;
    onCheckboxChange?: (checked: boolean, data: UserInfoData) => void;
    groupMembers: any;
    onPrivateChat?: (userId: string) => void | boolean;
    onAddContact?: (userId: string) => void | boolean;
    onClickBack?: () => void;
    groupId: string;
    isOwner?: boolean;
    onUserSelect?: (user: UserSelectInfo & {
        type: 'add' | 'delete';
    }, users: UserSelectInfo[]) => void;
    enableMultipleSelection?: boolean;
    checkedUsers?: UserInfoData[];
    moreAction?: UserItemProps['moreAction'];
}
declare const _default: React.FunctionComponent<GroupMemberProps>;
export default _default;
