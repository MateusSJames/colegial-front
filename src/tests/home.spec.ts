import request from 'supertest'
import {HomeService} from '../services/home_service'

describe('Home', () => {
    it('should return orders pendings', async () => {
        const homeService = new HomeService();
        const response: any = await homeService.getOrdersPendings('pluspedidos', 'Solicitado')
        expect(response.status).toEqual(200);
    })

    it('should get client by order', async () => {
        const homeService = new HomeService();
        const response: any = await homeService.getClientByOrder('pluspedidos', '1')
        expect(response.status).toEqual(200);
    })
})