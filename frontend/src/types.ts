import type { Session, User } from "@supabase/supabase-js";
export interface Note {
    id: number;
    title: string;
    content: string;
    created_at: string,
    updated_at: string,
     tags: string[];
}


export type SearchTypeProp = "title" | "content" | "tags"

export interface NotesState {
    notes: Array<Note>,
    activeNote: null | Note,
    latestAIResponse: string,
    lastPromptAction: string,
    searchTerm: string,
    searchType: SearchTypeProp,
    lastPromptContent: string,
    isSaving: boolean,
    loadNotes: () => void,
    setTags: (updatedNoteId: number, tags: string[]) => void,
    setSearchTerm: (searchKey : string) => void,
    setlatestAIResponse: (latestAIResponse : string) => void,
    setPromptContent: (content : string) => void,
    setLastPromptAction: (action : string) => void,
    setSearchType: (key : SearchTypeProp) => void,
    addNote : () => void,
    setActiveNote: (note: Note | null) => void,
    updateNote: (note: Note) => void,
    updateTitle: (updatedNoteId: number, updatedTitle: string) => void,
    deleteNote: (id: number) => void

}

export interface ThemeState {
    isDarkTheme: boolean,
    setTheme: (isDark: boolean) => void,

}

export interface ChatState{
    chatHistory: ChatMessage[],
    loadChats: () => void,
    addToChatHistory: (chatMsg: ChatInsertMsg[]) => void,
    deleteChat: (deletedChatId: number) => void,
    clearChatForNote: (noteId: number) => void
    clearChat: () => void,
}
export interface ChatMessage {
  id: number;
  note_id: number;
  role: "user" | "assistant";
  content: string;
  created_at: string;
};

export interface ChatInsertMsg {
  note_id: number;
  role: "user" | "assistant";
  content: string;
}

export interface UserType {
    id: number;
    email: string;
    metadata: string;
    created_at: string;
}

export interface UserLoginType{
    email: string;
    password: string;
}

export interface AuthState {
    user: User | null;
    session : Session | null;
    initialized: boolean;
    isAuthLoading: boolean;
    setAuthLoading: (authStatus: boolean) => void;

  login: (
    user: User | null,
    session: Session | null
  ) => void;

  logout: () => void;
}