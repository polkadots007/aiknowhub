import { supabase } from "../../lib/supabase";

export function isAbortError(error: unknown): boolean {
  return (
    typeof error === "object" &&
    error !== null &&
    "name" in error &&
    error.name === "AbortError"
  );
}


export async function fetchSharedUsers(noteId: number) {
   const { data, error } = await supabase.rpc("get_note_members", {
  note_id: noteId,
});

      if (error) throw error;

  return data;
}


