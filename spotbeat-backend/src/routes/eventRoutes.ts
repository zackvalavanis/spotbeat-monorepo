import { Router } from "express";
import { getEvents } from '../controllers/eventController.ts';

const router = Router();

router.get('/', getEvents)

// router.get('/:id', getSongById)

export default router