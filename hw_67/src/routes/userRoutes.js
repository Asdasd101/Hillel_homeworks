import express from 'express';
import { 
    getUsers, 
    getUserById, 
    createUser, 
    createManyUsers, 
    updateUser, 
    updateManyUsers, 
    replaceUser, 
    deleteUser, 
    deleteManyUsers,
    getUserCursor,
    getUserStats
} from '../controllers/userController.js';

const router = express.Router();

router.get('/stats', getUserStats);
router.get('/cursor', getUserCursor);

router.get('/', getUsers);
router.get('/:userId', getUserById);

router.post('/', createUser);
router.post('/bulk', createManyUsers);

router.put('/bulk', updateManyUsers);
router.put('/:userId', updateUser);
router.put('/:userId/replace', replaceUser);

router.delete('/bulk', deleteManyUsers);
router.delete('/:userId', deleteUser);

export default router;