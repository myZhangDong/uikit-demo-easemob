import React from 'react';
import { GroupMemberProps } from '../groupMember';
export interface GroupDetailProps {
    prefix?: string;
    className?: string;
    style?: React.CSSProperties;
    conversation: {
        chatType: 'groupChat';
        conversationId: string;
    };
    onUserIdCopied?: (id: string) => void;
    groupMemberProps?: GroupMemberProps;
    onLeaveGroup?: () => void;
    onDestroyGroup?: () => void;
}
declare const _default: React.FunctionComponent<GroupDetailProps>;
export default _default;
