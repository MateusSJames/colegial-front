import { Request, Response } from "express";
import path from 'path';

class InitController {
   async openScreen(req: Request, res: Response) {
        const screen = req.params.screen;
        const filePath = path.resolve(`./src/public/views/${screen}.html`)
        res.sendFile(filePath);
   }
}

export { InitController }