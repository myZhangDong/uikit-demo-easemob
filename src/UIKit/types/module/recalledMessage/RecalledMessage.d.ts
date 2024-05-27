import React from 'react';
import { TextMessageProps } from '../textMessage';
import { BaseMessageType } from '../baseMessage/BaseMessage';
export interface RecalledMessageProps extends TextMessageProps {
    prefixCls?: string;
    className?: string;
    style?: React.CSSProperties;
    message: BaseMessageType;
    onlyContent?: boolean;
}
declare const RecalledMessage: (props: RecalledMessageProps) => JSX.Element | null;
export { RecalledMessage };
