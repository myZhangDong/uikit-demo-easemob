import React from 'react';
import { BaseMessageProps, renderUserProfileProps } from '../baseMessage';
import type { VideoMessageType } from '../types/messageType';
import { ChatSDK } from '../SDK';
export interface VideoMessageProps extends BaseMessageProps {
    videoMessage: ChatSDK.VideoMsgBody & VideoMessageType;
    prefix?: string;
    style?: React.CSSProperties;
    nickName?: string;
    renderUserProfile?: (props: renderUserProfileProps) => React.ReactNode;
    type?: 'primary' | 'secondly';
    className?: string;
    videoProps?: React.VideoHTMLAttributes<HTMLVideoElement>;
}
declare const _default: ((props: VideoMessageProps) => JSX.Element) & {
    displayName: string;
};
export default _default;
