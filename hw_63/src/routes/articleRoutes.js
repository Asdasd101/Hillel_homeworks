import express from 'express';
import { 
    getArticles, 
    createArticle, 
    getArticleById, 
    updateArticle, 
    deleteArticle 
} from '../controllers/articleController.js';
import { checkArticlePermissions } from '../middlewares/auth.js';
import { validateArticleId } from '../middlewares/validator.js';

const router = express.Router();

router.get('/', checkArticlePermissions, getArticles);
router.post('/', checkArticlePermissions, createArticle);
router.get('/:articleId', checkArticlePermissions, validateArticleId, getArticleById);
router.put('/:articleId', checkArticlePermissions, validateArticleId, updateArticle);
router.delete('/:articleId', checkArticlePermissions, validateArticleId, deleteArticle);

export default router;