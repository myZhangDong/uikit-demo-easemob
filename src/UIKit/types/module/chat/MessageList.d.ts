import React, { FC, ReactNode } from 'react';
import { ChatSDK } from '../SDK';
import type { RecallMessage } from '../store/MessageStore';
import { renderUserProfileProps } from '../baseMessage';
import { CurrentConversation } from '../store/ConversationStore';
import { BaseMessageProps } from '../baseMessage';
export interface MsgListProps {
    prefix?: string;
    className?: string;
    style?: React.CSSProperties;
    isThread?: boolean;
    renderMessage?: (message: ChatSDK.MessageBody | RecallMessage) => ReactNode;
    renderUserProfile?: (props: renderUserProfileProps) => React.ReactNode;
    conversation?: CurrentConversation;
    messageProps?: BaseMessageProps;
    onOpenThreadPanel?: (threadId: string) => void;
}
declare let MessageList: FC<MsgListProps>;
export { MessageList };
