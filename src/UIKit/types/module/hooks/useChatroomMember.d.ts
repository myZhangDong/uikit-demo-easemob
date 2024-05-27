declare const useChatroomMember: (chatroomId: string) => {
    getConversationList: () => void;
    next: boolean;
};
declare const clearPageNum: () => void;
export { useChatroomMember, clearPageNum };
