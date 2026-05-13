export interface Note {
    id: number;
    title: string;
    content: string;
}


export type SearchTypeProp = "title" | "content"

export interface NotesState {
    notes: Array<Note>,
    activeNote: null | Note,
    aiContent: string,
    aiAction: string,
    // selectedNotes: Array<Note>,
    // addToSelected : (notes: Array<Note>) => void,
    searchTerm: string,
    searchType: SearchTypeProp,
    isDarkTheme: boolean,
    setTheme: (isDark: boolean) => void,
    setSearchTerm: (searchKey : string) => void,
    setAIContent: (aiContent : string) => void,
    setAIAction: (action : string) => void,
    setSearchType: (key : SearchTypeProp) => void,
    addNote : () => void,
    setActiveNote: (note: Note | null) => void,
    updateNote: (note: Note) => void,
    updateTitle: (updatedNoteId: number, updatedTitle: string) => void,
    deleteNote: (id: number) => void

}
