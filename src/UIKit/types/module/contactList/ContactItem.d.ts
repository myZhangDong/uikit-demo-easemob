import React, { FC, ReactNode } from 'react';
import { UserInfoData } from '../../component/userItem';
export interface ContactItemProps {
    contactId: string;
    className?: string;
    prefix?: string;
    avatarShape?: 'circle' | 'square';
    avatarSize?: number;
    focus?: boolean;
    onClick?: (e: React.MouseEvent<HTMLDivElement, MouseEvent>, contactId: string) => void;
    children?: ReactNode;
    style?: React.CSSProperties;
    isActive?: boolean;
    data: any;
    selectedId?: string;
    checkable?: boolean;
    checkedUserList?: string[];
    defaultCheckedList?: string[];
    onCheckboxChange?: (checked: boolean, data: UserInfoData) => void;
}
declare const ContactItem: FC<ContactItemProps>;
export { ContactItem };
