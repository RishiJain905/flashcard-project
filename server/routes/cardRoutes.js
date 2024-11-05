import express from 'express';
import cardController from '../controllers/cardController';
import authenticateJWT from '../controllers/authMiddleware';

const router = express.Router();

router.post('/groups', authenticateJWT, cardController.postGroup);
router.update('/groups', authenticateJWT, cardController.upsertGroup);
router.delete('/groups/:id', authenticateJWT, cardController.deleteGroup);
router.get('/groups', authenticateJWT, cardController.getGroups);

router.post('/groups/:id/cards', authenticateJWT, cardController.postCard);
router.delete('/groups/:group_id/cards/:type/:id', authenticateJWT, cardController.deleteCard);
router.get('/groups/:id', authenticateJWT, cardController.getCards);
export default router;