/** create Thread component, 实现和Chat组件一样的功能，一样的样式*/
import React from 'react';
import { MessageInputProps } from '../messageInput';
import { MsgListProps } from '../chat/MessageList';
export interface ThreadProps {
    prefix?: string;
    className?: string;
    style?: React.CSSProperties;
    messageListProps?: MsgListProps;
    createThread?: boolean;
    messageInputProps?: MessageInputProps;
}
declare const _default: ((props: ThreadProps) => JSX.Element) & {
    displayName: string;
};
export default _default;
