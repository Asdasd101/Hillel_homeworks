import express from 'express';
import { 
    getUsers, 
    createUser, 
    getUserById, 
    updateUser, 
    deleteUser 
} from '../controllers/userController.js';
import { checkAuth } from '../middlewares/auth.js';
import { validateUserId, validateUserBody } from '../middlewares/validator.js';

const router = express.Router();

router.get('/', checkAuth, getUsers);
router.post('/', checkAuth, validateUserBody, createUser);
router.get('/:userId', checkAuth, validateUserId, getUserById);
router.put('/:userId', updateUser);
router.delete('/:userId', deleteUser);

export default router;