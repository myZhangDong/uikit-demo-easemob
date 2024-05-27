import React from 'react';
export interface ScrollListProps<T> {
    className?: string;
    style?: React.CSSProperties;
    renderItem: (item: T, index: number) => React.ReactNode;
    paddingHeight?: number;
    loadMoreItems?: () => void | Promise<void>;
    scrollTo?: () => 'top' | 'bottom' | string;
    hasMore?: boolean;
    scrollDirection?: 'up' | 'down';
    prefix?: string;
    data: Array<T>;
    loading: boolean;
    onScroll?: (e: Event) => void;
}
declare let ScrollList: <T>() => React.MemoExoticComponent<React.MemoExoticComponent<React.ForwardRefExoticComponent<Pick<ScrollListProps<T> & React.RefAttributes<any>, "key" | keyof ScrollListProps<T>> & React.RefAttributes<any>>>>;
export { ScrollList };
