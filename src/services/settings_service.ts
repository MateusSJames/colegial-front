import axios from 'axios';

interface StatusPayLoad {
    id: number;
    nome: string;
    posicao: number;
}

interface PostStatusPayLoad {
    nome: string;
}

class SettingsService implements ISettingsScript {
    async setActiveStatus<T>(param: T, id: T): Promise<T> {
        try {
            const statusRequest = await axios.put(`http://localhost:7000/status/active/${param}/${id}`);
            const statusResponse = {status: statusRequest.status, response: statusRequest.data} as T;
            return statusResponse;
        } catch (error: any) {
            return {status: error.response.status, message: error.response.statusText} as T;
        }
    }
    async getInactiveStatusList<T>(param: T): Promise<T> {
        try {
            const statusRequest = await axios.get(`http://localhost:7000/status/inactive/${param}`);
            let response: Array<T> = [];
            statusRequest.data.map((e: any) => {
                response.push(e);
            })
            const statusResponse = {status: statusRequest.status, response: response} as T;
            return statusResponse;
        } catch (error: any) {
            return {status: error.response.status, message: error.response.statusText} as T;
        }
    }
    async getStatusList<T>(param: T): Promise<T> {
        try {
            const statusRequest = await axios.get(`http://localhost:7000/status/list/${param}`);
            let response: Array<T> = [];
            statusRequest.data.map((e: any) => {
                response.push(e);
            })
            const statusResponse = {status: statusRequest.status, response: response} as T;
            return statusResponse;
        } catch (error: any) {
            return {status: error.response.status, message: error.response.statusText} as T;
        }
    }

    async setStatusPosition<T>(base: T, body: StatusPayLoad): Promise<T> {
        try {
            const statusRequest = await axios.put(`http://localhost:7000/status/position/${base}`, body);
            const statusResponse = {status: statusRequest.status, response: statusRequest.data} as T;
            return statusResponse;
        } catch (error: any) {
            return {status: error.response.status, message: error.response.statusText} as T;
        }
    }

    async postStatus<T>(base: T, body: PostStatusPayLoad): Promise<T> {
        try {
            const statusRequest = await axios.post(`http://localhost:7000/status/novo/position/${base}`, body);
            const statusResponse = {status: statusRequest.status, response: statusRequest.data} as T;
            return statusResponse;
        } catch (error: any) {
            return {status: error.response.status, message: error.response.statusText} as T;
        }
    }

    async deleteStatus<T>(base: T, id: T): Promise<T> {
        try {
            const statusRequest = await axios.delete(`http://localhost:7000/status/delete/${base}/${id}`);
            const statusResponse = {status: statusRequest.status, response: statusRequest.data} as T;
            return statusResponse;
        } catch (error: any) {
            return {status: error.response.status, message: error.response.statusText} as T;
        }
    }
}

export { SettingsService }