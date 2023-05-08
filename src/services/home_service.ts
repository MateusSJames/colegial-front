import axios from 'axios';

class HomeService implements IHomeScript{
    
    async getOrdersPendings<T>(param: T, name: T): Promise<T> {
        try {
            const statusRequest = await axios.get(`http://localhost:7000/pedido/pendentes/${param}?name=${name}`);
            const statusResponse = {status: statusRequest.status, response: statusRequest.data} as T;
            return statusResponse;
        } catch (error: any) {
            return {status: error.response.status, message: error.response.statusText} as T;
        }
    }

}

export { HomeService }