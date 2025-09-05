import { Router } from "express";
import { getEvents, getEventById } from '../controllers/eventController.js';

const router: Router = Router();

router.get('/', getEvents);       // list of events
router.get('/:id', getEventById); // single event by ID

export default router;
