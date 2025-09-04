import type { Request, Response } from 'express';
import { supabase } from '../utils/supabase.js';

export const getAllLikes = async (_req: Request, res: Response) => {
  const { data, error } = await supabase.from('likes').select('*');

  if (error) return res.status(500).json({ error: error.message });
  res.status(200).json(data);
}