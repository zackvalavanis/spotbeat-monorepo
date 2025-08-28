import { Router } from "express";
import { getEvents } from '../controllers/eventController.js';

const router: Router = Router();

router.get('/', getEvents)

// router.get('/:id', getSongById)

export default router