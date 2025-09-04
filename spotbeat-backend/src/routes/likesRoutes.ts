import { Router } from "express";
import { getAllLikes } from '../controllers/likesController.js';


const router = Router()

router.get('/', getAllLikes)



export default router