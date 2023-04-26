import { LoginService } from '../services/login_service';

const button = document.getElementById('login-btn')

button?.addEventListener('click', async (e) => {
    const loginService = new LoginService();
    const email = (document.getElementById('email') as HTMLInputElement)?.value
    const senha = (document.getElementById('senha') as HTMLInputElement)?.value
    const alert = document.getElementById('alert-content')
    const credentials = {
        email: email,
        senha: senha
    }
    const responseLogin = await loginService.sendLogin(credentials);
    if(responseLogin.status != 200) {
        if(alert != null) {
            alert.style.visibility = "visible";
            setTimeout(() => {
                alert.style.visibility = "hidden";
            }, 3000);
            
        }
    }
})