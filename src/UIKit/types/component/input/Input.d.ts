import React, { ReactNode } from 'react';
export interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
    prefix?: string;
    className?: string;
    style?: React.CSSProperties;
    size?: 'large' | 'middle' | 'small';
    required?: boolean;
    value?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onClear?: () => void;
    placeholder?: string;
    shape?: 'ground' | 'square';
    close?: boolean;
    disabled?: boolean;
    maxLength?: number;
    suffix?: ReactNode;
    prefixIcon?: ReactNode;
    suffixIcon?: ReactNode;
    onFocus?: () => void;
    onBlur?: () => void;
}
declare const Input: React.ForwardRefExoticComponent<InputProps & React.RefAttributes<HTMLInputElement>>;
export default Input;
