import { FC, ReactNode } from 'react';
export interface ContactGroupProps {
    prefix?: string;
    children?: ReactNode;
    title?: string;
    unreadCount?: number;
    itemCount?: number;
    itemHeight?: number;
    onclickTitle?: (data: any) => void;
    hasMenu?: boolean;
    highlightUnread?: boolean;
}
declare const ContactGroup: FC<ContactGroupProps>;
export { ContactGroup };
