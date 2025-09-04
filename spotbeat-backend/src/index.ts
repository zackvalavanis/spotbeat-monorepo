import express, { type Request, type Response } from 'express';
import cors from 'cors'
import eventRoutes from './routes/eventRoutes.js';
import authRoutes from './routes/authRoutes.js';
import process from 'process';
import likesRoutes from './routes/likesRoutes.js';


const app = express();
const PORT = process.env.PORT || 8000;
app.use(cors({
  origin: 'http://localhost:5173', // your React frontend
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));

app.use(express.json());

app.use('/api/events', eventRoutes);
app.use('/api/auth', authRoutes)

app.use('/api/likes', likesRoutes)

app.get('/', (req: Request, res: Response) => {
  res.send('SpotBeat Backend is running!');
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
