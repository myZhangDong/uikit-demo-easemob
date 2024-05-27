import React, { ReactNode } from 'react';
import { MessageStatusProps } from '../messageStatus';
import { ChatSDK } from '../SDK';
import { ReactionData, ReactionMessageProps } from '../reaction';
interface CustomAction {
    visible: boolean;
    icon?: ReactNode;
    actions?: {
        visible?: boolean;
        icon?: ReactNode;
        content?: string;
        onClick?: (message: BaseMessageType) => void;
    }[];
}
export declare type BaseMessageType = Exclude<ChatSDK.MessageBody, ChatSDK.DeliveryMsgBody | ChatSDK.ReadMsgBody | ChatSDK.ChannelMsgBody>;
export interface renderUserProfileProps {
    userId: string;
}
export interface BaseMessageProps {
    id?: string;
    reactionData?: ReactionData[];
    bubbleType?: 'primary' | 'secondly' | 'none';
    bubbleStyle?: React.CSSProperties;
    status?: MessageStatusProps['status'];
    avatar?: ReactNode;
    avatarShape?: 'circle' | 'square';
    direction?: 'ltr' | 'rtl';
    prefix?: string;
    shape?: 'ground' | 'square';
    arrow?: boolean;
    nickName?: string;
    className?: string;
    children?: React.ReactNode;
    style?: React.CSSProperties;
    time?: number;
    hasRepliedMsg?: boolean;
    repliedMessage?: ChatSDK.MessageBody;
    customAction?: CustomAction;
    reaction?: boolean;
    select?: boolean;
    messageStatus?: boolean;
    message?: BaseMessageType;
    onReplyMessage?: () => void;
    onDeleteMessage?: () => void;
    onAddReactionEmoji?: (emojiString: string) => void;
    onDeleteReactionEmoji?: (emojiString: string) => void;
    onShowReactionUserList?: (emojiString: string) => void;
    onRecallMessage?: (message: BaseMessageType) => void;
    onTranslateMessage?: () => void;
    onModifyMessage?: () => void;
    onSelectMessage?: () => void;
    onResendMessage?: () => void;
    onForwardMessage?: (message: BaseMessageType) => void;
    onReportMessage?: (message: BaseMessageType) => void;
    onMessageCheckChange?: (checked: boolean) => void;
    renderUserProfile?: (props: renderUserProfileProps) => React.ReactNode;
    onCreateThread?: () => void;
    thread?: boolean;
    chatThreadOverview?: ChatSDK.ChatThreadOverview;
    onClickThreadTitle?: () => void;
    reactionConfig?: ReactionMessageProps['reactionConfig'];
    formatDateTime?: (time: number) => string;
}
declare let BaseMessage: (props: BaseMessageProps) => JSX.Element;
export { BaseMessage };
