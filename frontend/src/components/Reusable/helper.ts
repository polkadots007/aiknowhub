import { supabase } from "../../lib/supabase";

export function isAbortError(error: unknown): boolean {
  return (
    typeof error === "object" &&
    error !== null &&
    "name" in error &&
    error.name === "AbortError"
  );
}


export async function fetchSharedUsers(noteId: string) {
  const { data, error } = await supabase
    .from("note_users")
    .select(`
      user_id,
      role,
      profiles (
        email
      )
    `)
    .eq("note_id", noteId);

  if (error) throw error;

  return data;
}