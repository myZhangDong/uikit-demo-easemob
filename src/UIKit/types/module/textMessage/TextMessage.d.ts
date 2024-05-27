import React from 'react';
import { BaseMessageProps, renderUserProfileProps } from '../baseMessage';
import type { TextMessageType } from '../types/messageType';
import { ChatSDK } from '../SDK';
export interface TextMessageProps extends BaseMessageProps {
    textMessage: TextMessageType;
    type?: 'primary' | 'secondly';
    prefix?: string;
    nickName?: string;
    className?: string;
    bubbleClass?: string;
    children?: string;
    style?: React.CSSProperties;
    renderUserProfile?: (props: renderUserProfileProps) => React.ReactNode;
    onCreateThread?: () => void;
    onTranslateTextMessage?: (textMessage: ChatSDK.TextMsgBody) => boolean;
    targetLanguage?: string;
    showTranslation?: boolean;
    onlyContent?: boolean;
    onOpenThreadPanel?: (threadId: string) => void;
}
export declare const renderTxt: (txt: string | undefined | null, parseUrl?: boolean) => React.ReactNode[];
declare const _default: React.MemoExoticComponent<((props: TextMessageProps) => JSX.Element | null) & {
    displayName: string;
}>;
export default _default;
