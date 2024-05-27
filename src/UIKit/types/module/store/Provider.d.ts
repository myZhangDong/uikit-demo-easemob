import React, { ReactNode } from 'react';
export interface ProviderProps {
    initConfig: {
        appKey: string;
        userId?: string;
        token?: string;
        password?: string;
        translationTargetLanguage?: string;
        useUserInfo?: boolean;
        msyncUrl?: string;
        restUrl?: string;
        isHttpDNS?: boolean;
        useReplacedMessageContents?: boolean;
        deviceId?: string;
    };
    local?: {
        fallbackLng?: string;
        lng?: string;
        resources?: {
            [key: string]: {
                translation: {
                    [key: string]: string;
                };
            };
        };
    };
    children?: ReactNode;
    features?: {
        chat?: {
            header?: {
                threadList: boolean;
                moreAction?: boolean;
                clearMessage?: boolean;
                deleteConversation?: boolean;
                audioCall?: boolean;
                videoCall?: boolean;
            };
            message?: {
                status?: boolean;
                thread?: boolean;
                reaction?: boolean;
                moreAction?: boolean;
                reply?: boolean;
                delete?: boolean;
                recall?: boolean;
                translate?: boolean;
                edit?: boolean;
                select?: boolean;
                forward?: boolean;
                report?: boolean;
            };
            messageInput?: {
                mention?: boolean;
                typing?: boolean;
                record?: boolean;
                emoji?: boolean;
                moreAction?: boolean;
                file?: boolean;
                picture?: boolean;
                video?: boolean;
                contactCard?: boolean;
            };
        };
        conversationList?: {
            search?: boolean;
            item?: {
                moreAction?: boolean;
                deleteConversation?: boolean;
                pinConversation?: boolean;
                muteConversation?: boolean;
                presence?: boolean;
            };
        };
    };
    reactionConfig?: {
        map: {
            [key: string]: HTMLImageElement;
        };
    };
    theme?: {
        primaryColor?: string | number;
        mode?: 'light' | 'dark';
        avatarShape?: 'circle' | 'square';
        bubbleShape?: 'ground' | 'square';
        componentsShape?: 'ground' | 'square';
    };
}
declare const _default: React.NamedExoticComponent<ProviderProps>;
export default _default;
