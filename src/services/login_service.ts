import axios from 'axios';

interface CredentialsPayLoad {
    email: string;
    senha: string;
}

class LoginService implements IloginScript{
    async sendLogin<T>(credentials: CredentialsPayLoad): Promise<T> {
        try {
            const loginRequest = await axios.post('http://localhost:7000/login/fornecedor', credentials);
            return {status: loginRequest.status, message: loginRequest.data} as T;
        } catch (error: any) {
            return {status: error.response.status, message: error.response.statusText} as T;
        }
    }
    
}

export { LoginService }