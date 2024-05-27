/// <reference types="react" />
import { EmojiProps } from '../messageInput/emoji/Emoji';
export interface EmojiKeyBoardProps {
    prefixCls?: string;
    onSelected?: (emoji: string) => void;
    onDelete?: (emoji: string) => void;
    selectedList?: string[];
    reactionConfig?: EmojiProps['emojiConfig'];
    placement?: EmojiProps['placement'];
}
declare const EmojiKeyBoard: (props: EmojiKeyBoardProps) => JSX.Element;
export { EmojiKeyBoard };
