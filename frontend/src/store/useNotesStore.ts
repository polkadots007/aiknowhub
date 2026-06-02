import { create } from "zustand";
import { type NotesState, type Note, type SearchTypeProp } from "../types";
import { supabase } from "../lib/supabase";

export const useNotesStore = create<NotesState>()((set) => ({
  notes: [],
  activeNote: null,
  searchTerm: "",
  searchType: "title",
  latestAIResponse: "",
  lastPromptAction: "",
  lastPromptContent: "",
  isSaving: false,
  loading: false,
  addNote: async (userId : string) => {
    set({ isSaving: true })
    const newNote = {
      title: "Untitled",
      content: "",
      updated_at: new Date().toISOString(),
      tags: [],
      created_by: userId
    };
    const { data, error } = await supabase
      .from("notes")
      .insert([{ ...newNote }])
      .select()
      .single();
    if (error) throw error;
    set((state) => ({
      notes: [data, ...state.notes],
      activeNote: data,
    }));
    set({ isSaving: false })
  },
  setTags: async (updatedNoteId: number, tags: string[]) => {
    set({ isSaving: true })
    const { data, error } = await supabase
      .from("notes")
      .update({
        tags: tags,
        updated_at: new Date().toISOString()
      })
      .eq("id", updatedNoteId)
      .select()
      .single();
    if (error) throw error;
    set((state) => ({
      notes: state.notes.map((note) =>
        note.id === updatedNoteId ? data : note,
      ),
    }));
    set({ isSaving: false })
  },
  setPromptContent: (content: string) => {
    set(() => ({
      lastPromptContent: content,
    }));
  },
  setSearchTerm: (searchKey: string) => {
    set(() => ({
      searchTerm: searchKey,
    }));
  },
  setSearchType: (key: SearchTypeProp) => {
    set(() => ({
      searchType: key,
    }));
  },
  setlatestAIResponse: (latestAIResponse: string) => {
    set(() => ({
      latestAIResponse: latestAIResponse,
    }));
  },
  setLastPromptAction: (action: string) => {
    set(() => ({
      lastPromptAction: action,
    }));
  },
  setActiveNote: (note: Note | null) => set({ activeNote: note }),
 loadNotes: async () => {
  set({ loading: true });

  try {
    const { data, error } = await supabase
      .from("notes")
      .select("*");

    if (error) throw error;

    set({
      notes: data || [],
    });
  } catch (err) {
    console.error("Failed to load notes:", err);
  } finally {
    set({ loading: false });
  }
},
  updateNote: async (updatedNote: Note) => {
    set({ isSaving: true })
    const { data, error } = await supabase
      .from("notes")
      .update({
        title: updatedNote.title,
        content: updatedNote.content,
        tags: updatedNote.tags,
        updated_at: new Date().toISOString(),
      })
      .eq("id", updatedNote.id)
      .select()
      .single();
    if (error) throw error;
    set((state) => ({
      notes: state.notes.map((note) => (note.id === data.id ? data : note)),
      activeNote: data,
    }));
    set({ isSaving: false })
  },
  updateTitle: async (updatedNoteId: number, updatedTitle: string) => {
    set({ isSaving: true })
    const { data, error } = await supabase
      .from("notes")
      .update({
        title: updatedTitle,
        updated_at: new Date().toISOString()
      })
      .eq("id", updatedNoteId)
      .select()
      .single();
    if (error) throw error;
    set((state) => ({
      notes: state.notes.map((note) =>
        note.id === data.id ? { ...note, title: data.title } : note,
      ),
    }));
    set({ isSaving: false })
  },
  deleteNote: async (id: number) => {
    const { error } = await supabase.from("notes").delete().eq("id", id);
    if (error) throw error;
    set((state) => ({
      notes: state.notes.filter((note: Note) => note.id !== id),
      activeNote: state.activeNote?.id === id ? null : state.activeNote,
    }));
  },
    setLoading: (loading: boolean) => set({ loading : loading }),

}));
