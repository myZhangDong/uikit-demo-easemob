import React from 'react';
import { BaseMessageType } from '../baseMessage/BaseMessage';
export interface RepliedMsgProps {
    prefixCls?: string;
    className?: string;
    style?: React.CSSProperties;
    shape?: 'ground' | 'square';
    direction?: 'ltr' | 'rtl';
    message: BaseMessageType;
}
declare const RepliedMsg: (props: RepliedMsgProps) => JSX.Element | null;
export { RepliedMsg };
