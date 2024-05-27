import React, { ReactNode } from 'react';
import { ChatSDK } from '../../SDK';
import { CurrentConversation } from '../../store/ConversationStore';
import giftConfig from './giftConfig';
export interface GiftKeyboardProps {
    prefix?: string;
    className?: string;
    style?: React.CSSProperties;
    icon?: ReactNode;
    onSelected?: (emojiString: string) => void;
    trigger?: 'click' | 'hover';
    onClick?: (e: React.MouseEvent<Element, MouseEvent>) => void;
    conversation?: CurrentConversation;
    gifts?: ReactNode[];
    onSendMessage?: (message: ChatSDK.CustomMsgBody) => void;
    onBeforeSendMessage?: (message: ChatSDK.MessageBody) => Promise<{
        chatType: 'chatRoom';
        conversationId: string;
    } | void>;
    giftConfig?: typeof giftConfig;
}
declare const GiftKeyboard: (props: GiftKeyboardProps) => JSX.Element;
export { GiftKeyboard };
