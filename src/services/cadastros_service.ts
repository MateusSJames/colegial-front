import axios from 'axios'

class CadastroService implements ICadastroScript{
    async getTableValues<T>(param: T, name: T, page: string, field?: string, value?: string): Promise<T> {
        try {
            if(field && value) {
                const statusRequest = await axios.get(`http://localhost:7000/fornecedores/tables/${param}/${name}?campo=${field}&valor=${value}&page=${page}`);
                let response: Array<T> = [];
                statusRequest.data.map((e: any) => {
                    response.push(e);
                })
                const statusResponse = {status: statusRequest.status, response: response} as T;
                return statusResponse;
            } else {
                const statusRequest = await axios.get(`http://localhost:7000/fornecedores/tables/${param}/${name}?page=${page}`);
                let response: Array<T> = [];
                statusRequest.data.map((e: any) => {
                    response.push(e);
                })
                const statusResponse = {status: statusRequest.status, response: response} as T;
                return statusResponse;
            }
        } catch (error: any) {
            return {status: error.response.status, message: error.response.statusText} as T;
        }
    }
}

export { CadastroService }