import React, { FC, ReactNode } from 'react';
export interface UserInfoData {
    userId: string;
    nickname?: string;
    description?: string;
    avatarUrl?: string;
    isOnline?: boolean;
}
export interface UserItemProps {
    className?: string;
    prefix?: string;
    nickname?: string;
    avatarShape?: 'circle' | 'square';
    avatarSize?: number;
    avatar?: ReactNode;
    onClick?: React.MouseEventHandler<HTMLDivElement>;
    style?: React.CSSProperties;
    data: UserInfoData;
    selected?: boolean;
    checkable?: boolean;
    closeable?: boolean;
    onCheckboxChange?: (checked: boolean, data: UserInfoData) => void;
    checked?: boolean;
    disabled?: boolean;
    onClose?: (data: UserInfoData) => void;
    moreAction?: {
        visible?: boolean;
        icon?: ReactNode;
        actions: Array<{
            icon?: ReactNode;
            content: ReactNode;
            onClick?: (data: UserInfoData) => void;
        }>;
    };
}
declare let UserItem: FC<UserItemProps>;
export { UserItem };
