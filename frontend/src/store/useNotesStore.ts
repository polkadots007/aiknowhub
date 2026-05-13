import { create } from 'zustand'
import { persist } from "zustand/middleware"
import { type NotesState, type Note, type SearchTypeProp } from '../types'

export const useNotesStore = create<NotesState>()(
    persist(
        (set) => ({
    notes: [],
    activeNote: null,
    searchTerm: '',
    searchType: "title",
    aiContent:'',
    aiAction: '',
    isDarkTheme: false,
    addNote: () => {
        const newNote = {
            id: Date.now(),
            title: "Untitled",
            content: ""
        }
        set((state) => ({
            notes: [newNote, ...state.notes],
            activeNote: newNote
        }))
    },
    // addToSelected : (notes: Note[]) => {
    //     set(() => ({
    //         selectedNotes : notes
    //     }))
    // },
    setSearchTerm: (searchKey: string) => {
        set(() => ({
            searchTerm : searchKey
        }))
    },
    setSearchType: (key: SearchTypeProp) => {
        set(() => ({
            searchType : key 
        }))
    },
    setAIContent: (aiContent: string) => {
        set(() => ({
            aiContent : aiContent 
        }))
    },
    setAIAction: (action: string) => {
        set(() => ({
            aiAction : action 
        }))
    },
    setTheme: (isDark: boolean) => set({
        isDarkTheme: isDark
    }),
    setActiveNote: (note: Note | null) => set({ activeNote: note }),
    updateNote: (updatedNote: Note) => set((state) => ({
        notes: state.notes.map((note) => note.id === updatedNote.id ? updatedNote: note),
        activeNote: updatedNote
    })),
    updateTitle: (updatedNoteId: number, updatedTitle: string) => set((state) => ({
        notes: state.notes.map((note) => note.id === updatedNoteId? {id: note.id, title: updatedTitle, content: note.content}: note),
    })),
    deleteNote: (id: number) => set((state) => ({
        notes: state.notes.filter((note: Note) => note.id !== id),
        activeNote: null
    }))
}),{
    name: "notes-storage",
    partialize: (state) => ({
      notes: state.notes,
      isDarkTheme: state.isDarkTheme
    }),
}))
