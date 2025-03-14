import express from 'express';
import { getAllItemsController, getCreateItemsController } from '../controllers/itemsController.js';

const router = express.Router();

router.get('/', getAllItemsController);
router.get('/create', getCreateItemsController);

export default router;