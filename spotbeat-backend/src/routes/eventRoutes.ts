import { Router } from "express";
import { getEvents, getEventById, likeEvent } from '../controllers/eventController.js';

const router: Router = Router();

router.get('/', getEvents);       // list of events
router.get('/:id', getEventById); // single event by ID
router.post("/:id/like", likeEvent); // like an event

export default router;
