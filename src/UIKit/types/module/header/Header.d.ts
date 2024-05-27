import React, { FC, ReactNode } from 'react';
import { TooltipProps } from '../../component/tooltip/Tooltip';
export interface HeaderProps {
    className?: string;
    style?: React.CSSProperties;
    prefix?: string;
    content?: ReactNode;
    avatar?: ReactNode;
    subtitle?: ReactNode;
    icon?: ReactNode;
    back?: boolean;
    avatarSrc?: string;
    avatarShape?: 'circle' | 'square';
    close?: boolean;
    suffixIcon?: ReactNode;
    renderContent?: () => React.ReactElement;
    onClickEllipsis?: () => void;
    moreAction?: {
        visible?: boolean;
        icon?: ReactNode;
        actions: Array<{
            visible?: boolean;
            icon?: ReactNode;
            content: ReactNode;
            onClick?: () => void;
        }>;
        tooltipProps?: TooltipProps;
    };
    onClickAvatar?: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
    onClickClose?: () => void;
    onClickBack?: () => void;
}
declare const Header: FC<HeaderProps>;
export { Header };
