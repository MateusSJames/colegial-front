import { Request, Response } from "express";
import path from 'path';

class InitController {
   async openScreen(req: Request, res: Response) {
        const filePath = path.resolve('./src/public/views/index.html')
        res.sendFile(filePath);
   }
}

export { InitController }