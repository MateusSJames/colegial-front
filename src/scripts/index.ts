import { LoginService } from '../services/login_service';

const button = document.getElementById('login-btn')

button?.addEventListener('click', async (e) => {
    const loginService = new LoginService();
    const email = (document.getElementById('email') as HTMLInputElement)?.value
    const senha = (document.getElementById('senha') as HTMLInputElement)?.value
    const credentials = {
        email: email,
        senha: senha
    }
    const responseLogin = await loginService.sendLogin(credentials);
    console.log(responseLogin)
})