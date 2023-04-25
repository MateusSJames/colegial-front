import { Router, Response, Request } from 'express';
import { InitController } from '../../controllers/InitController';

const router = Router();
const initController = new InitController();

router.get('/', (req: Request, res: Response) => res.status(200).json({message: 'Funcionando!'}));
router.get('/index', initController.openScreen);

export { router as InitApplication }