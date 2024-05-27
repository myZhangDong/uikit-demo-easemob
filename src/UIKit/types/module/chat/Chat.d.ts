import React, { ReactNode } from 'react';
import { HeaderProps } from '../header';
import { MessageInputProps } from '../messageInput';
import { MsgListProps } from './MessageList';
import { CurrentConversation } from 'module/store/ConversationStore';
import { ChatSDK } from 'module/SDK';
export interface RtcRoomInfo {
    callId: string;
    calleeDevId?: string;
    calleeIMName: string;
    callerDevId?: string;
    callerIMName: string;
    channel: string;
    confrName: string;
    groupId: string;
    groupName: string;
    token?: string;
    type: number;
    joinedMembers: {
        agoraUid: number;
        imUserId: string;
    }[];
}
export interface ChatProps {
    prefix?: string;
    className?: string;
    style?: React.CSSProperties;
    threadModalStyle?: React.CSSProperties;
    renderHeader?: (cvs: {
        chatType: 'singleChat' | 'groupChat';
        conversationId: string;
        name?: string;
        unreadCount?: number;
    }) => ReactNode;
    renderMessageList?: () => ReactNode;
    renderMessageInput?: () => ReactNode;
    renderEmpty?: () => ReactNode;
    renderRepliedMessage?: (repliedMessage: ChatSDK.MessageBody | null) => ReactNode;
    headerProps?: HeaderProps;
    messageListProps?: MsgListProps;
    messageInputProps?: MessageInputProps;
    rtcConfig?: {
        appId: string;
        agoraUid: string | number;
        onInvite?: (data: {
            channel: string;
            conversation: CurrentConversation;
            type: 'audio' | 'video';
        }) => Promise<[{
            name: string;
            id: string;
            avatarurl?: string;
        }]>;
        onAddPerson?: (data: RtcRoomInfo) => Promise<[{
            id: string;
        }]>;
        getIdMap?: (data: {
            userId: string;
            channel: string;
        }) => Promise<{
            [key: string]: string;
        }>;
        onStateChange?: (data: {
            type: string;
            confr: any;
        }) => void;
        getRTCToken?: (data: {
            channel: number | string;
            chatUserId: string;
        }) => Promise<{
            agoraUid: string | number;
            accessToken: string;
        }>;
        groupAvatar?: string;
        onRing?: (data: {
            channel: string;
        }) => void;
    };
    onOpenThread?: (data: {
        id: string;
    }) => void;
    onOpenThreadList?: () => void;
    onVideoCall?: (data: {
        channel: string;
    }) => void;
    onAudioCall?: (data: {
        channel: string;
    }) => void;
}
declare const _default: React.MemoExoticComponent<React.ForwardRefExoticComponent<Pick<ChatProps & React.RefAttributes<unknown>, "key" | keyof ChatProps> & React.RefAttributes<unknown>>>;
export default _default;
