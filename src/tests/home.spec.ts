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
    it('should return all products by order', async () => {
        const homeService = new HomeService();
        const response: any = await homeService.getProductsByOrder('pluspedidos', '22')
        expect(response.status).toEqual(200);
    })
    it('should update status order', async () => {
        const settingsService = new HomeService();
        const status = {
            id_pedido: 24,
            id_status: 2
        }
        const result: any = await settingsService.updateStatusOrder('pluspedidos', status);
        expect(result.status).toEqual(201)
    })
    it('should update product by order', async () => {
        const settingsService = new HomeService();
        const product = {
            quantidade_atendida: 5,
            id_pedido: 23,
            ordem_prod_serv: 4
        }
        const result: any = await settingsService.updateProductByOrder('pluspedidos', product);
        expect(result.status).toEqual(200)
    })
    it('should get order by filters', async () => {
        const homeService = new HomeService();
        const response: any = await homeService.getOrdersByFilter('pluspedidos', 'cliente', 'Mateus')
        expect(response.status).toEqual(200);
    })
})