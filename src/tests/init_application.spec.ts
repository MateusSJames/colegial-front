import request from 'supertest'

import { app } from '../app';

describe('InitApplication', () => {
    it('should return 200 on test router', async() => {
        const response = await request(app).get('/');
        expect(response.statusCode).toEqual(200);
    })
})