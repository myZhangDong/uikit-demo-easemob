import React, { ReactNode } from 'react';
import { ChatSDK } from '../../SDK';
import { CurrentConversation } from '../../store/ConversationStore';
export interface MoreActionProps {
    style?: React.CSSProperties;
    className?: string;
    itemContainerStyle?: React.CSSProperties;
    prefix?: string;
    icon?: ReactNode;
    customActions?: Array<{
        content: string;
        onClick?: () => void;
        icon?: ReactNode;
    }>;
    conversation?: CurrentConversation;
    isChatThread?: boolean;
    onBeforeSendMessage?: (message: ChatSDK.MessageBody) => Promise<CurrentConversation | void>;
}
declare let MoreAction: (props: MoreActionProps) => JSX.Element;
export { MoreAction };
