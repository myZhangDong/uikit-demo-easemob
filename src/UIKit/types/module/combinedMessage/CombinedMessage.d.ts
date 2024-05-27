import React from 'react';
import { BaseMessageProps, renderUserProfileProps } from '../baseMessage';
import { ChatSDK } from '../SDK';
import { BaseMessageType } from '../baseMessage/BaseMessage';
export interface CombinedMessageProps extends BaseMessageProps {
    prefix?: string;
    className?: string;
    combinedMessage: ChatSDK.CombineMsgBody & {
        bySelf?: boolean;
        messages?: (BaseMessageType & {
            bySelf: boolean;
        })[];
        messageList?: (BaseMessageType & {
            bySelf?: boolean;
        })[];
    };
    style?: React.CSSProperties;
    nickName?: string;
    type?: 'primary' | 'secondly';
    bubbleClass?: string;
    onShowDetail?: (msg: ChatSDK.CombineMsgBody) => void;
    renderUserProfile?: (props: renderUserProfileProps) => React.ReactNode;
    showSummary?: boolean;
    onlyContent?: boolean;
}
declare const _default: ((props: CombinedMessageProps) => JSX.Element) & {
    displayName: string;
};
export default _default;
