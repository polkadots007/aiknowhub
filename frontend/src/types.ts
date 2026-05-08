export interface Note {
    id: number;
    title: string;
    content: string;
}


export type SearchTypeProp = "title" | "content"

export interface NotesState {
    notes: Array<Note>,
    activeNote: null | Note,
    // selectedNotes: Array<Note>,
    // addToSelected : (notes: Array<Note>) => void,
    searchTerm: string,
    setSearchTerm: (searchKey : string) => void,
    searchType: SearchTypeProp,
    setSearchType: (key : SearchTypeProp) => void,
    addNote : () => void,
    setActiveNote: (note: Note | null) => void,
    updateNote: (note: Note) => void,
    updateTitle: (updatedNoteId: number, updatedTitle: string) => void,
    deleteNote: (id: number) => void

}
