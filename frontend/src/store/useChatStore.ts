import { create } from 'zustand'
import { persist } from "zustand/middleware"
import { type ChatMessage, type ChatState } from '../types'

export const useChatStore = create<ChatState>()(
    persist(
        (set) => ({
    chatHistory: [],
    addToChatHistory: (chatMsg: ChatMessage) => set((state) => ({
        chatHistory: [...state.chatHistory, chatMsg]
    })),
    deleteChat: (deletedNoteId: number) => set((state) => ({
        chatHistory: state.chatHistory.filter(
    (msg) => msg.noteId !== deletedNoteId
    )
    })),
    clearChatForNote: (noteId: number) => set((state) => ({
      chatHistory: state.chatHistory.filter((chat: ChatMessage) => chat.noteId !== noteId)  
    })),
    clearChat: () => set({
    chatHistory: []
})
}),{
    name: "chat-history-storage",
    partialize: (state) => ({
      chatHistory: state.chatHistory
    }),
}))
