import { createClient } from "@supabase/supabase-js";
import { Request, Response, NextFunction } from "express";

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY;

if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
  throw new Error("Missing Supabase env variables");
}

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

export async function authMiddleware(req: Request, res: Response, next: NextFunction) {
  const token = req.headers.authorization?.replace("Bearer ", "");

  if (!token) {
    return res.status(401).json({ error: "No token" });
  }

  const { data, error } = await supabase.auth.getUser(token);

  if (error || !data.user) {
    return res.status(401).json({ error: "Invalid token" });
  }

  // attach user to request
  req.user = data.user;

  next();
}