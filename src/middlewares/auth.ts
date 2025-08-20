import type { Request, Response, NextFunction } from 'express';

export const authenticateUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) return res.status(401).json({ error: 'No authorization header' });

    const token = authHeader.split(' ')[1]; // Expect "Bearer <token>"
    if (!token) return res.status(401).json({ error: 'Malformed token' });

    // Verify the token with Supabase REST endpoint
    const response = await fetch(`${process.env.SUPABASE_URL}/auth/v1/user`, {
      headers: {
        Authorization: `Bearer ${token}`,
        ...(process.env.SUPABASE_ANON_KEY ? { apikey: process.env.SUPABASE_ANON_KEY } : {}),
      },
    });

    if (!response.ok) {
      const text = await response.text();
      console.error('Supabase error:', text);
      return res.status(401).json({ error: 'Invalid token' });
    }

    const user = await response.json();

    // Attach user to request object
    (req as any).user = user;

    next();
  } catch (err) {
    console.error('Unhandled error in authenticateUser:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
};
