import { Router } from 'express';
import homeController from '../controllers/HomeController';

const router = new Router();

router.post('/', homeController.store);
router.get('/', homeController.index);
router.get('/:id', homeController.show);
router.put('/:id', homeController.update);
router.delete('/:id', homeController.delete);

export default router;
