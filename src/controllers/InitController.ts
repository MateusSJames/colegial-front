import { Request, Response } from "express";
import path from 'path';

class InitController {
   async openScreen(req: Request, res: Response) {
        const screen = req.params.screen;
        const filePath = path.resolve(`./src/public/views/${screen}.html`)
        if(screen == 'status') {
            const filePath = path.resolve(`./src/public/views/settings/${screen}.html`)        
            res.sendFile(filePath);
         } else {
            res.sendFile(filePath);
         }
         
   }
}

export { InitController }