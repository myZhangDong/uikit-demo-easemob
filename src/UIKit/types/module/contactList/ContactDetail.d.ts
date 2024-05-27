import React from 'react';
export interface ContactDetailProps {
    prefix?: string;
    style?: React.CSSProperties;
    className?: string;
    data: {
        id: string;
        name: string;
        type: 'contact' | 'group';
    } | {
        id: string;
        name: string;
        requestStatus: 'pending' | 'read' | 'accepted';
        type: 'request';
    };
    onUserIdCopied?: (id: string) => void;
    onMessageBtnClick?: () => void | boolean;
    onAudioCall?: () => void | boolean;
    onVideoCall?: () => void | boolean;
}
export declare const ContactDetail: React.FC<ContactDetailProps>;
declare const _default: React.FunctionComponent<ContactDetailProps>;
export default _default;
