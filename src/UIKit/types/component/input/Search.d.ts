import React, { ReactNode, ChangeEvent } from 'react';
export interface SearchProps {
    className?: string;
    prefix?: string;
    icon?: ReactNode;
    onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
    style?: React.CSSProperties;
    inputStyle?: React.CSSProperties;
    shape?: 'ground' | 'square';
    placeholder?: string;
}
export default function Search(props: SearchProps): JSX.Element;
export { Search };
