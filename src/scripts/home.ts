import { SettingsService } from '../services/settings_service'

const buttonParam = document.getElementById('parametros')
const buttonPedido = document.getElementById('pedidos')
//FALTA DEIXAR DINAMICO A BASE DO FORNECEDOR
buttonParam?.addEventListener('click', (event) => {
    event.preventDefault();
    
    const filterContent = document.getElementById('filters');
    if(filterContent != null) {
        filterContent.innerHTML = `
            <button id='status-page'>Status</button>
        `;
    }

    const buttonStatus = document.getElementById('status-page')

    buttonStatus?.addEventListener('click', async (event) => {
        event.preventDefault();
        // console.log(settings)
    })
})

buttonPedido?.addEventListener('click', (event) => {
    event.preventDefault();
    alert('Hello Pedidos');
    const filterContent = document.getElementById('filters');
    if(filterContent != null) {
        filterContent.innerHTML = `
            <h2>Solicitado</h2>
            <h2>Separado</h2>
            <h2>Enviado</h2>
            <h2>Entregue</h2>
        `;
    }
})
