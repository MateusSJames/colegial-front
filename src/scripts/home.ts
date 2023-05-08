import { SettingsService } from '../services/settings_service'
import { HomeService } from '../services/home_service'

const buttonParam = document.getElementById('parametros')
const buttonPedido = document.getElementById('pedidos')

interface StatusDto {
    id: number;
    nome: string;
    posicao: number;
    finalizado: number;
    inativo: number;
}

interface OrderDto {
    id: number,
	ordem_cli_for: number,
    data_gravacao: string,
	observacao: string,
	sequencia_shop: number,
	nome_fornecedor: string,
	data_atualizacao: string,
	st: string,
	total: number
}

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

buttonPedido?.addEventListener('click', async (event) => {
    event.preventDefault();
    
    const serviceStatus = new SettingsService();
    const serviceHome = new HomeService();
    
    const statusResponse: any = await serviceStatus.getStatusList('pluspedidos')
    let listStatus: StatusDto[] = statusResponse.response
    
    const orderResponse: any = await serviceHome.getOrdersPendings('pluspedidos', listStatus[0].nome)
    let ordersPendings: OrderDto[] = orderResponse.response

    const filterContent = document.getElementById('filters');
    const contentPage = document.getElementById('content-page');

    if(filterContent != null) {
        filterContent.innerHTML = '';
        listStatus.map((e) => {
            filterContent.innerHTML += `
                <h3 id="filter-status-${e.id}">${e.nome}</h3>
            `;
        })
    }
    if(contentPage) {
        contentPage.innerHTML = '';
        ordersPendings.map((e) => {
            const date = new Date(e.data_atualizacao);
            const formattedDate = Intl.DateTimeFormat(
                'pt-BR', 
                {
                    year: 'numeric',
                    month: '2-digit',
                    day: '2-digit',
                    hour: '2-digit',
                    minute: '2-digit',
                    second: '2-digit'
            }).format(date)
            if(e.observacao === '') {
                contentPage.innerHTML += `
                    <div id="order-${e.id}">
                        <h4>Data:  ${formattedDate}</h4>
                        <div id="row-ids">
                            <h4>Pedido:  ${e.id}</h4>
                            <h4>Seq.Shop:  ${e.sequencia_shop}</h4>
                        </div>
                        <h4>Fornecedor:  ${e.nome_fornecedor}</h4>
                        <h4>Status:  ${e.st}</h4>
                        <h4>Valor:  ${e.total}</h4>
                    </div>
                `
            } else {
                contentPage.innerHTML += `
                    <div id="order-${e.id}">
                        <h4>Data:  ${formattedDate}</h4>
                        <div id="row-ids">
                            <h4>Pedido:  ${e.id}</h4>
                            <h4>Seq.Shop:  ${e.sequencia_shop}</h4>
                        </div>
                        <h4>Fornecedor:  ${e.nome_fornecedor}</h4>
                        <h4>Status:  ${e.st}</h4>
                        <h4>Obs:  ${e.observacao}</h4>
                        <h4>Valor:  ${e.total}</h4>
                    </div>
                `
            }
        })
    }
})
