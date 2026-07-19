import express from 'express';
import { getUsers, createUser, getUserById, updateUser, deleteUser } from '../controllers/userController.js';
import { validateUserId, validateUserBody } from '../middlewares/validator.js';
import { isAuthenticated } from '../middlewares/auth.js';

const router = express.Router();

router.get('/', getUsers);
router.get('/:userId', validateUserId, getUserById);
router.post('/', isAuthenticated, validateUserBody, createUser);
router.put('/:userId', isAuthenticated, validateUserId, updateUser);
router.delete('/:userId', isAuthenticated, validateUserId, deleteUser);

export default router;