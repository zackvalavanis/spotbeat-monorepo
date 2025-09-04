import type { Request, Response } from 'express';
import { supabase } from '../utils/supabase.js';


// get all likes - For Testing Purposes
export const getAllLikes = async (_req: Request, res: Response) => {
  const { data, error } = await supabase.from('likes').select('*');

  if (error) return res.status(500).json({ error: error.message });
  res.status(200).json(data);
}

//Get likes by user ID

export const getLikesByUser = async (_req: Request, res: Response) => {
  const userId = _req.params.userId

  const { data, error } = await supabase.from('likes').select('*').eq('user_id', userId);

  if (error) return res.status(500).json({ error: error.message })

  res.status(200).json(data)
}

// Add a like

export const addLike = async (_req: Request, res: Response) => {
  const { user_id, event_id } = _req.body;

  if (!user_id || !event_id) {
    return res.status(400).json({ error: 'user_id and event_id are required' });
  }
  const { data, error } = await supabase.from('likes').insert({ user_id, event_id }).select().single();

  if (error) return res.status(500).json({ error: error.message })

  res.status(201).json(data)
}