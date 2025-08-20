import express from "express";
import { authenticateUser } from "../middlewares/auth.ts";
import { supabase } from "../utils/supabase.ts";

const router = express.Router();

router.get('/me', authenticateUser, async (req, res) => {
  try {
    const { user } = req as any; // already attached by middleware
    if (!user) return res.status(401).json({ error: 'User not authenticated' });

    res.json(user); // just return the user object
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }

    const { data, error } = await supabase.auth.signInWithPassword({ email, password });

    if (error || !data.session) {
      return res.status(401).json({ error: error?.message || 'Invalid login' });
    }

    const { user, session } = data;

    // Return user info + access token
    res.json({ user, access_token: session.access_token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;
