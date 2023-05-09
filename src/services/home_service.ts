import axios from 'axios';

interface StatusPayload {
    id_pedido: number;
    id_status: number;
}

class HomeService implements IHomeScript{
    async getProductsByOrder<T>(param: T, order: T): Promise<T> {
        try {
            const statusRequest = await axios.get(`http://localhost:7000/pedido/produtos/${param}/${order}`);
            const statusResponse = {status: statusRequest.status, response: statusRequest.data} as T;
            return statusResponse;
        } catch (error: any) {
            return {status: error.response.status, message: error.response.statusText} as T;
        }
    }
    
    async getClientByOrder<T>(param: T, order: T): Promise<T> {
        try {
            const statusRequest = await axios.get(`http://localhost:7000/cliente/dados/${param}/${order}`);
            const statusResponse = {status: statusRequest.status, response: statusRequest.data} as T;
            return statusResponse;
        } catch (error: any) {
            return {status: error.response.status, message: error.response.statusText} as T;
        }
    }
    
    async getOrdersPendings<T>(param: T, name: T): Promise<T> {
        try {
            const statusRequest = await axios.get(`http://localhost:7000/pedido/pendentes/${param}?name=${name}`);
            const statusResponse = {status: statusRequest.status, response: statusRequest.data} as T;
            return statusResponse;
        } catch (error: any) {
            return {status: error.response.status, message: error.response.statusText} as T;
        }
    }

    async updateStatusOrder<T>(param: T, order: StatusPayload): Promise<T> {
        try {
            const loginRequest = await axios.post(`http://localhost:7000/status/${param}`, order);
            return {status: loginRequest.status, message: loginRequest.data} as T;
        } catch (error: any) {
            return {status: error.response.status, message: error.response.statusText} as T;
        }
    }

}

export { HomeService }