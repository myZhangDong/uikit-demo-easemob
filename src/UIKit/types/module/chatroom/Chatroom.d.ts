import React, { ReactNode } from 'react';
import { HeaderProps } from '../header';
import { MessageInputProps } from '../messageInput';
import { MsgListProps } from '../chat/MessageList';
import { BroadcastProps } from '../../component/broadcast';
import { ChatroomInfo } from '../store/AddressStore';
export declare let reportType: Record<string, string>;
export interface ChatroomProps {
    prefix?: string;
    className?: string;
    style?: React.CSSProperties;
    renderEmpty?: () => ReactNode;
    renderHeader?: (roomInfo: ChatroomInfo) => ReactNode;
    headerProps?: {
        avatar: ReactNode;
        onAvatarClick?: () => void;
        moreAction?: HeaderProps['moreAction'];
    };
    renderMessageList?: () => ReactNode;
    renderMessageInput?: () => ReactNode;
    messageInputProps?: MessageInputProps;
    messageListProps?: MsgListProps;
    renderBroadcast?: () => ReactNode;
    broadcastProps?: BroadcastProps;
    chatroomId: string;
    reportType?: Record<string, string>;
}
declare const _default: ((props: ChatroomProps) => JSX.Element) & {
    displayName: string;
};
export default _default;
