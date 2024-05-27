import React, { ReactNode } from 'react';
import { AppUserInfo } from '../store/index';
import { HeaderProps } from '../header';
import { UserItemProps } from '../../component/userItem';
export interface ChatroomMemberProps {
    prefix?: string;
    className?: string;
    style?: React.CSSProperties;
    chatroomId: string;
    renderHeader?: (cvs: {
        chatType: 'singleChat' | 'groupChat' | 'chatRoom';
        conversationId: string;
        name?: string;
        unreadCount?: number;
    }) => ReactNode;
    headerProps?: {
        avatar: ReactNode;
        onAvatarClick?: () => void;
        moreAction?: HeaderProps['moreAction'];
        onCloseClick?: () => void;
        content?: ReactNode;
    };
    memberListProps?: {
        search?: boolean;
        placeholder?: string;
        renderEmpty?: () => ReactNode;
        renderItem?: (item: AppUserInfo) => ReactNode;
        UserItemProps?: UserItemProps;
    };
    muteListProps?: {
        search?: boolean;
        placeholder?: string;
        renderEmpty?: () => ReactNode;
        renderItem?: (item: AppUserInfo) => ReactNode;
        UserItemProps?: UserItemProps;
    };
}
declare const _default: ((props: ChatroomMemberProps) => JSX.Element | null) & {
    displayName: string;
};
export default _default;
