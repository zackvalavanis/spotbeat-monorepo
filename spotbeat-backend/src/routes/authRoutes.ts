import express, { Router } from "express";
import { authenticateUser } from "../middlewares/auth.js";
import { supabase } from "../utils/supabase.js";

const router: Router = Router();

interface AuthenticatedRequest extends express.Request {
  user?: any; // refine if you have a User type
}

router.get('/me', authenticateUser, async (req: AuthenticatedRequest, res) => {
  try {
    const user = req.user;
    if (!user) return res.status(401).json({ error: 'User not authenticated' });

    res.json(user);
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

    res.json({ user, access_token: session.access_token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;
