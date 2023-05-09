import { HomeService } from '../services/home_service'
import { SettingsService } from '../services/settings_service'

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

interface ClientDto {
    ordem: number,
	codigo: number,
    fantasia: string,
	email: string
}

function updateList(lista: OrderDto[], listaStatus: StatusDto[]) {
    let orders = '';
    if(lista.length > 0) {
        lista.map((e) => {
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
            const formattedValue = new Intl.NumberFormat('pt-BR', {
                style: 'currency',
                currency: 'BRL'
            }).format(e.total);
            orders += `
                <div id="order-${e.id}">
                    <h4>Data:  ${formattedDate}</h4>
                    <h4>Pedido:  ${e.id}</h4>
                    <h4>Valor:  ${formattedValue}</h4>
                </div>
            `
        })
    } else {
        orders = `
            <h3>Você não possue nenhum pedido com esse status</h3>
        `;
    }
    const contentPage = document.getElementById('content-page');
    if(contentPage) {
        contentPage.innerHTML = orders;
    }
    lista.map((e) => {
        const orderPeding = document.getElementById(`order-${e.id}`)
        orderPeding?.addEventListener('click', async () => {
            const homeService = new HomeService()
            const clientResponse: any = await homeService.getClientByOrder('pluspedidos', e.ordem_cli_for.toString())
            const client: ClientDto = clientResponse.response[0];
            const gridDetails = document.getElementById('grid-details');
            if(gridDetails) {
                gridDetails.innerHTML = '';
                gridDetails.style.visibility = "visible";
                gridDetails.innerHTML += `
                    <div id="header-client">
                        <h3>Cliente: ${client.fantasia}</h3>
                        <select id="drop-status">
                        </select>
                    </div>
                    <div id="body-products">
                        <table>
                            <tr>
                            <th>Coluna 1</th>
                            <th>Coluna 2</th>
                            <th>Coluna 3</th>
                            </tr>
                            <tr>
                            <td>Dado 1</td>
                            <td>Dado 2</td>
                            <td>Dado 3</td>
                            </tr>
                            <tr>
                            <td>Dado 4</td>
                            <td>Dado 5</td>
                            <td>Dado 6</td>
                            </tr>
                        </table>                  
                    </div>
                `
                const dropDownStatus = document.getElementById("drop-status");
                if(dropDownStatus) {
                    dropDownStatus.innerHTML += `
                        <option value="option-first">${e.st}</option>
                    `
                    listaStatus.map((st) => {
                        if(st.nome != e.st) {
                            dropDownStatus.innerHTML += `
                                <option value="option${st.posicao}">${st.nome}</option>
                            `
                        }
                    })
                }
                
            }
        })
    })
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
        if(ordersPendings.length > 0) {
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
                const formattedValue = new Intl.NumberFormat('pt-BR', {
                    style: 'currency',
                    currency: 'BRL'
                }).format(e.total);
                contentPage.innerHTML += `
                    <div id="order-${e.id}">
                        <h4>Data:  ${formattedDate}</h4>
                        <h4>Pedido:  ${e.id}</h4>
                        <h4>Valor:  ${formattedValue}</h4>
                    </div>
                `
            })
        } else {
            contentPage.innerHTML += `
                <h3>Você não possue nenhum pedido pendente</h3>
            `
        }
    }

    const filtersDiv = document.getElementById('filters');
    const h3List = filtersDiv?.querySelectorAll('h3');

    h3List?.forEach((h3) => {
      h3.addEventListener('click', async () => {
        const orderResponse: any = await serviceHome.getOrdersPendings('pluspedidos', h3.textContent)
        let ordersPendings: OrderDto[] = orderResponse.response
        const gridDetails = document.getElementById('grid-details');
        if(gridDetails) {
            gridDetails.style.visibility = "hidden";
            gridDetails.innerHTML = '';
        }
        updateList(ordersPendings, listStatus);
      });
    });

    ordersPendings.map((e) => {
        const orderPeding = document.getElementById(`order-${e.id}`)
        orderPeding?.addEventListener('click', async () => {
            const homeService = new HomeService()
            const clientResponse: any = await homeService.getClientByOrder('pluspedidos', e.ordem_cli_for.toString())
            const client: ClientDto = clientResponse.response[0];
            const gridDetails = document.getElementById('grid-details');
            if(gridDetails) {
                gridDetails.innerHTML = '';
                gridDetails.style.visibility = "visible";
                gridDetails.innerHTML += `
                    <div id="header-client">
                        <h3>Cliente: ${client.fantasia}</h3>
                        <select id="drop-status">
                        </select>
                    </div>
                    <div id="body-products">
                        <table id="table-products">
                            <tr>
                                <th>Produto</th>
                                <th>Solicitada</th>
                                <th>Atendida</th>
                            </tr>
                            <tr>
                                <td>Dado 1</td>
                                <td>Dado 2</td>
                                <td>Dado 3</td>
                            </tr>
                            <tr>
                                <td>Dado 4</td>
                                <td>Dado 5</td>
                                <td>Dado 6</td>
                            </tr>
                        </table>                  
                    </div>
                `
                const dropDownStatus = document.getElementById("drop-status");
                if(dropDownStatus) {
                    dropDownStatus.innerHTML = '';
                    dropDownStatus.innerHTML += `
                        <option value="option-first">${e.st}</option>
                    `
                    listStatus.map((st) => {
                        if(st.nome != e.st) {
                            dropDownStatus.innerHTML += `
                                <option value="option${st.posicao}">${st.nome}</option>
                            `
                        }
                    })
                }
                
            }
        })
    })
})

