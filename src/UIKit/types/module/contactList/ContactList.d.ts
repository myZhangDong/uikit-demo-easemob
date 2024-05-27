import React, { FC } from 'react';
import { UserInfoData } from '../../component/userItem';
export interface ContactListProps {
    style?: React.CSSProperties;
    className?: string;
    prefix?: string;
    onSearch?: (e: React.ChangeEvent<HTMLInputElement>) => boolean;
    onItemClick?: (info: {
        id: string;
        type: 'contact' | 'group' | 'request';
        name: string;
    }) => void;
    menu?: ('contacts' | 'groups' | 'requests' | {
        title: string;
        data: ({
            remark?: string;
            userId: string;
        } | {
            groupname: string;
            groupid: string;
        })[];
    })[];
    hasMenu?: boolean;
    checkable?: boolean;
    onCheckboxChange?: (checked: boolean, data: UserInfoData) => void;
    header?: React.ReactNode;
    checkedList?: {
        id: string;
        type: 'contact' | 'group';
        name?: string;
    }[];
    defaultCheckedList?: {
        id: string;
        type: 'contact' | 'group';
        name?: string;
    }[];
    searchStyle?: React.CSSProperties;
    searchInputStyle?: React.CSSProperties;
    searchPlaceholder?: string;
}
declare let ContactList: FC<ContactListProps>;
export { ContactList };
