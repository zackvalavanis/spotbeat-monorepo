import express, { type Request, type Response } from 'express';
import cors from 'cors'
import eventRoutes from './routes/eventRoutes';
import authRoutes from './routes/authRoutes';


const app = express();
const PORT = process.env.PORT || 8000;
app.use(cors({
  origin: 'http://localhost:5173', // your React frontend
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));

app.use(express.json());

app.use('/api/getEvents', eventRoutes);
app.use('/api/auth', authRoutes)

app.get('/', (req: Request, res: Response) => {
  res.send('SpotBeat Backend is running!');
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
