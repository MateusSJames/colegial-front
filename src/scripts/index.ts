import { LoginService } from '../services/login_service';

const button = document.getElementById('login-btn')

button?.addEventListener('click', async (e) => {
    const loginService = new LoginService();
    const email = (document.getElementById('email') as HTMLInputElement)?.value
    const senha = (document.getElementById('senha') as HTMLInputElement)?.value
    const alertContent = document.getElementById('alert-content')
    const credentials = {
        email: email,
        senha: senha
    }
    const responseLogin = await loginService.sendLogin(credentials);
    const responseStatus: { [key: number]: string } = {
        404: 'Dados incorretos, verifique e tente novamente',
        401: 'Você não está liberado para usar esse sistema',
        500: 'Erro interno no Servidor'
    }
    if(responseLogin.status != 201) {
        if(alertContent != null) {
            alertContent.style.visibility = "visible";
            alertContent.innerHTML = `
                    <h3>${responseStatus[responseLogin.status]}</h3>
                `
            setTimeout(() => {
                alertContent.style.visibility = "hidden";
            }, 3000);
            
        }
    } else {
        console.log(responseLogin)
        // window.location.href = '/home';
    }
})