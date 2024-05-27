import React from 'react';
import { BaseMessageProps, renderUserProfileProps } from '../baseMessage';
import type { CustomMessageType } from '../types/messageType';
export interface UserCardMessageProps extends BaseMessageProps {
    customMessage: CustomMessageType;
    prefix?: string;
    style?: React.CSSProperties;
    className?: string;
    type?: 'primary' | 'secondly';
    onClick?: (url: string) => void;
    nickName?: string;
    renderUserProfile?: (props: renderUserProfileProps) => React.ReactNode;
    onUserIdCopied?: (userId: string) => void;
}
declare const _default: ((props: UserCardMessageProps) => JSX.Element) & {
    displayName: string;
};
export default _default;
