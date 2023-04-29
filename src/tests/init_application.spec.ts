import request from 'supertest'

import { app } from '../app';
import { LoginService } from '../services/login_service';

describe('InitApplication', () => {
    it('should return 200 on test router', async() => {
        const response = await request(app).get('/');
        expect(response.statusCode).toEqual(200);
    })

    it('shoud return 404 on login', async () => {
        const loginService = new LoginService();
        const credentials = {
            email: 'johnDoe@gmail.com',
            senha: '123'
        };
        const result:any = await loginService.sendLogin(credentials);
        expect(result.status).toEqual(404);
    })

    it('shoud success with login', async () => {
        const loginService = new LoginService();
        const credentials = {
            email: 'teste@gmail.com',
            senha: '1'
        };
        const result:any = await loginService.sendLogin(credentials);
        expect(result.status).toEqual(201);
    })

    it('shoud unathorized login', async () => {
        const loginService = new LoginService();
        const credentials = {
            email: 'alfredo@gmail.com',
            senha: '123'
        };
        const result:any = await loginService.sendLogin(credentials);
        expect(result.status).toEqual(401);
    })
})