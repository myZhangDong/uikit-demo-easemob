import React, { ChangeEvent, ReactElement } from 'react';
export interface CheckboxProps {
    prefix?: string;
    id?: string;
    className?: string;
    style?: React.CSSProperties;
    checked?: boolean;
    defaultChecked?: boolean;
    disabled?: boolean;
    children?: React.ReactNode;
    onChange?(e: ChangeEvent<HTMLInputElement>): void;
    shape?: 'square' | 'ground';
}
declare const Checkbox: ({ id, checked, defaultChecked, disabled, children, className, onChange, shape, prefix, style, }: CheckboxProps) => ReactElement;
export { Checkbox };
