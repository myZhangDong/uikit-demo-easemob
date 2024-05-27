import React from 'react';
import { ChatSDK } from '../../SDK';
import { CurrentConversation } from '../../store/ConversationStore';
export interface TextareaProps {
    prefix?: string;
    className?: string;
    style?: React.CSSProperties;
    placeholder?: string;
    hasSendButton?: boolean;
    sendButtonActiveColor?: string;
    enableEnterSend?: boolean;
    enabledMention?: boolean;
    enabledTyping?: boolean;
    isChatThread?: boolean;
    onSendMessage?: (message: ChatSDK.TextMsgBody) => void;
    conversation?: CurrentConversation;
    onBeforeSendMessage?: (message: ChatSDK.MessageBody) => Promise<CurrentConversation | void>;
    onChange?: (value: string) => void;
}
export interface ForwardRefProps {
    setTextareaValue: (value: string) => void;
    divRef: React.RefObject<HTMLDivElement>;
}
declare let Textarea: React.ForwardRefExoticComponent<TextareaProps & React.RefAttributes<ForwardRefProps>>;
export { Textarea };
