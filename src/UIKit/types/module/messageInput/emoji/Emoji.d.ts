import React, { ReactNode } from 'react';
import { TooltipProps } from '../../../component/tooltip/Tooltip';
export interface EmojiConfig {
    path: string;
    map: {
        [key: string]: string;
    };
}
export interface EmojiProps {
    prefix?: string;
    style?: React.CSSProperties;
    className?: string;
    emojiContainerStyle?: React.CSSProperties;
    icon?: ReactNode;
    onSelected?: (emojiString: string) => void;
    trigger?: 'click' | 'hover';
    config?: {
        map: any;
        path: string;
    };
    onClick?: (e: React.MouseEvent<Element, MouseEvent>) => void;
    selectedList?: string[];
    onDelete?: (emojiString: string) => void;
    emojiConfig?: EmojiConfig;
    placement?: TooltipProps['placement'];
}
declare const Emoji: (props: EmojiProps) => JSX.Element;
export { Emoji };
