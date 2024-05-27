declare const useConversations: () => {
    getConversationList: () => Promise<void>;
    hasConversationNext: boolean;
};
declare const clearPageNum: () => void;
export { useConversations, clearPageNum };
