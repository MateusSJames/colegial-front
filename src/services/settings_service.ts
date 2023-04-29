import axios from 'axios';

class SettingsService implements ISettingsScript {
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

}

export { SettingsService }