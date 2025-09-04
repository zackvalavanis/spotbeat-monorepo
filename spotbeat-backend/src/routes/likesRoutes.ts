import { Router } from "express";
import { getAllLikes } from '../controllers/likesController.js';
import { getLikesByUser } from '../controllers/likesController.js';
import { addLike } from '../controllers/likesController.js';
import { removeLike } from '../controllers/likesController.js';


const router = Router()

router.get('/', getAllLikes)
router.get('/user/:userId', getLikesByUser)
router.post('/', addLike)
router.delete('/:id', removeLike)



export default router