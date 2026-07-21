import express from 'express';
import { checkArticlePermissions, isAuthenticated } from '../middlewares/auth.js';
import { 
    getArticles, 
    getArticleById, 
    createArticle, 
    updateArticle, 
    deleteArticle 
} from '../controllers/articleController.js';

const router = express.Router();

router.get('/', getArticles);
router.get('/:articleId', getArticleById);
router.post('/', checkArticlePermissions, createArticle);
router.put('/:articleId', checkArticlePermissions, updateArticle);
router.delete('/:articleId', checkArticlePermissions, deleteArticle);

export default router;