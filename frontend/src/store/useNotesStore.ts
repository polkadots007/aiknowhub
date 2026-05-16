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
    lastPromptAction: '',
    isDarkTheme: false,
    lastPromptContent: '',
    addNote: () => {
        const newNote = {
            id: Date.now(),
            title: "Untitled",
            content: "",
            createdAt: Date.now(),
            updatedAt: -1,
            tags: []
        }
        set((state) => ({
            notes: [newNote, ...state.notes],
            activeNote: newNote
        }))
    },
    setTags: (updatedNoteId: number, tags: string[]) => set((state) => ({
        notes: state.notes.map((note) => note.id === updatedNoteId? { ...note, tags: tags} : note),
    })),
    setPromptContent: (content: string) => {
        set(() => ({
            lastPromptContent : content
        }))
    },
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
    setLastPromptAction: (action: string) => {
        set(() => ({
            lastPromptAction : action 
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
        notes: state.notes.map((note) => note.id === updatedNoteId? {...note, title: updatedTitle}: note),
    })),
    deleteNote: (id: number) => set((state) => ({
        notes: state.notes.filter((note: Note) => note.id !== id),
        activeNote: state.activeNote?.id === id ? null : state.activeNote
    }))
}),{
    name: "notes-storage",
    partialize: (state) => ({
      notes: state.notes,
      isDarkTheme: state.isDarkTheme
    }),
}))
