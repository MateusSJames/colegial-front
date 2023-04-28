import { Request, Response, Router } from 'express';

import { InitController } from '../../controllers/InitController';
import { verifyToken }  from '../../middlewares/auth'

const router = Router();
const initController = new InitController();

router.get('/', (req: Request, res: Response) => res.status(200).json({message: 'Funcionando!'}));
router.get('/:screen', verifyToken, initController.openScreen);

export { router as InitApplication }