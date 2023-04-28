import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

const verifyToken = (req: any, res: Response, next: NextFunction) => {
    const page = req.params.screen;
    if(page === 'index') {
        next();
    } else {
        const token = localStorage.getItem('token');
        console.log(token)
        if (!token) return res.status(401).json({ auth: false, message: 'fornecedor nao liberado' });

        jwt.verify(token as string, 'PlusPedidos1411', (err: any, decoded: any) => {
            if (err) return res.status(401).json({ auth: false, message: 'Failed to authenticate token.' });      
            
            req.userId = decoded.id;
            next();
        })
    }
}

export { verifyToken }
