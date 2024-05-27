import React, { ReactNode } from 'react';
import { MoreActionProps } from './moreAction';
import { ChatSDK } from '../SDK';
import { CurrentConversation } from '../store/ConversationStore';
import { GiftKeyboardProps } from './gift/GiftKeyboard';
export declare type Actions = {
    name: string;
    visible: boolean;
    icon?: ReactNode;
    onClick?: () => void;
}[];
export interface MessageInputProps {
    prefix?: string;
    actions?: Actions;
    customActions?: MoreActionProps['customActions'];
    enabledTyping?: boolean;
    onSend?: (message: any) => void;
    className?: string;
    style?: React.CSSProperties;
    showSendButton?: boolean;
    sendButtonIcon?: ReactNode;
    row?: number;
    placeHolder?: string;
    disabled?: boolean;
    isChatThread?: boolean;
    enabledMention?: boolean;
    onSendMessage?: (message: ChatSDK.MessageBody) => void;
    conversation?: CurrentConversation;
    onBeforeSendMessage?: (message: ChatSDK.MessageBody) => Promise<CurrentConversation | void>;
    giftKeyboardProps?: GiftKeyboardProps;
}
declare const _default: {
    (props: MessageInputProps): JSX.Element;
    defaultActions: Actions;
} & {
    displayName: string;
};
export default _default;
