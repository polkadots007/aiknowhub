import { create } from 'zustand'
import { type ChatInsertMsg, type ChatMessage, type ChatState } from '../types'
import { supabase } from '../lib/supabase';

export const useChatStore = create<ChatState>()(
        (set) => ({
    chatHistory: [],
    loadChats: async () => {
      const { data, error } = await supabase.from("chats").select("*");
    if(error) throw error;
    set({
        chatHistory: data
    })
    },
    addToChatHistory: async (chatMsg: ChatInsertMsg[]) => {
        const { data, error } = await supabase
              .from("chats")
              .insert(chatMsg)
              .select();
            if (error) throw error;
        set((state) => ({
        chatHistory: [...state.chatHistory, ...data]
    }))
    },
    deleteChat: async (deletedChatId: number) => {
    const { error } = await supabase.from("chats").delete().eq("id", deletedChatId);
    if (error) throw error;
        set((state) => ({
        chatHistory: state.chatHistory.filter(
    (msg) => msg.id !== deletedChatId
    )
    }))
    },
    clearChatForNote: async (noteId: number) => {
    const { error } = await supabase.from("chats").delete().eq("note_id", noteId);
    if (error) throw error;
    set((state) => ({
      chatHistory: state.chatHistory.filter((chat: ChatMessage) => chat.note_id !== noteId)  
    }))
    },
    clearChat: () => set({
    chatHistory: []
})
}))
