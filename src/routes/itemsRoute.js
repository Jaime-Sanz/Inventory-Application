import express from 'express';
import { getAllItemsController, getCreateItemsController, postCreateItemsController } from '../controllers/itemsController.js';

const router = express.Router();

router.get('/', getAllItemsController);
router.get('/create', getCreateItemsController);
router.post('/create', postCreateItemsController);

export default router;