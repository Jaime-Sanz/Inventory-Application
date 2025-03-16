import express from 'express';
import { getAllItemsController, getEveryoneRatedGamesController, getTeenRatedGamesController, getMatureRatedGamesController, 
    getCreateItemsController, postCreateItemsController, postDeleteItemsController } from '../controllers/itemsController.js';
import validateUser  from '../validation/validate.js';

const router = express.Router();

router.get('/', getAllItemsController);
router.get('/everyone', getEveryoneRatedGamesController);
router.get('/teen', getTeenRatedGamesController);
router.get('/mature', getMatureRatedGamesController);
router.get('/create', getCreateItemsController);

router.post('/create', validateUser, postCreateItemsController);
router.post('/delete', postDeleteItemsController);

export default router;