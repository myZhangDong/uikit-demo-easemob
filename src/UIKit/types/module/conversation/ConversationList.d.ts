import React from 'react';
import { ConversationItemProps } from './ConversationItem';
import { HeaderProps } from '../header';
import { Conversation } from '../store/ConversationStore';
export declare type ConversationData = Array<Conversation>;
export declare type ServerCvs = Array<{
    channel_id: string;
    lastMessage: any;
    unread_num: number;
}>;
export interface ConversationListProps {
    prefix?: string;
    className?: string;
    style?: React.CSSProperties;
    onItemClick?: (data: Conversation) => void;
    onSearch?: (e: React.ChangeEvent<HTMLInputElement>) => boolean;
    renderHeader?: () => React.ReactNode;
    renderSearch?: () => React.ReactNode;
    renderItem?: (cvs: Conversation, index: number) => React.ReactNode;
    headerProps?: HeaderProps;
    itemProps?: Partial<ConversationItemProps>;
    presence?: boolean;
    showSearchList?: boolean;
}
declare const ConversationList: React.FunctionComponent<ConversationListProps>;
export { ConversationList };
