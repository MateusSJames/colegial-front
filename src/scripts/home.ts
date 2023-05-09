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

interface ProductDto {
    id_pedido: number,
    ordem_prod_serv: number,
    quantidade: number,
    valor: number,
    complemento: string,
    quantidade_atendida: number,
    foto: string,
    nome: string
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
        const orderPeding = document.getElementById(`order-${e.id}`)
        orderPeding?.addEventListener('click', async () => {
            const homeService = new HomeService()
            const clientResponse: any = await homeService.getClientByOrder('pluspedidos', e.ordem_cli_for.toString())
            const client: ClientDto = clientResponse.response[0];
            const productResponse: any = await homeService.getProductsByOrder('pluspedidos', e.id.toString());
            const products: ProductDto[] = productResponse.response;
            const gridDetails = document.getElementById('grid-details');
            if(gridDetails) {
                gridDetails.innerHTML = '';
                gridDetails.style.visibility = "visible";
                gridDetails.innerHTML += `
                    <div id="exit-details">
                        <h2 id="btn-exit-details">X</h2>
                    </div>
                    <div id="header-client">
                        <div id="dates-order">
                            <h3>Cliente: ${client.fantasia}</h3>
                            <h5>Data: ${formattedDate}</h5>
                            <h5>Pedido:  ${e.id}</h5>
                            <h5>Valor: ${formattedValue}</h5>
                        </div>
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

                const buttonExit = document.getElementById('btn-exit-details');
                buttonExit?.addEventListener('click', () => {
                    gridDetails.style.visibility = 'hidden'
                })

                const tableProducts = document.getElementById('table-products');
                if(tableProducts) {
                    products.map((product) => {
                        tableProducts.innerHTML += `
                            <tr>
                                <th>${product.nome}</th>
                                <th>${product.quantidade}</th>
                                <th>${product.quantidade_atendida}</th>
                            </tr>
                        `;
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
            if(e.posicao == 0) {
                const firstStatus= document.getElementById(`filter-status-${e.id}`);
                if(firstStatus) {
                    firstStatus.style.color = 'white'
                }
            }
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
        const allH3s = document.querySelectorAll('#filters h3'); // Seleciona todos os h3s dentro da div filters
        allH3s.forEach(h3Element => {
            if (h3Element instanceof HTMLHeadingElement) {
                h3Element.style.color = 'black'
            }
        });
        h3.style.color = 'white';
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
        const orderPeding = document.getElementById(`order-${e.id}`)
        orderPeding?.addEventListener('click', async () => {
            const homeService = new HomeService()
            const clientResponse: any = await homeService.getClientByOrder('pluspedidos', e.ordem_cli_for.toString())
            const productResponse: any = await homeService.getProductsByOrder('pluspedidos', e.id.toString());
            const products: ProductDto[] = productResponse.response;
            const client: ClientDto = clientResponse.response[0];
            const gridDetails = document.getElementById('grid-details');
            if(gridDetails) {
                gridDetails.innerHTML = '';
                gridDetails.style.visibility = "visible";
                gridDetails.innerHTML += `
                    <div id="exit-details">
                        <h2 id="btn-exit-details">X</h2>
                    </div>
                    <div id="header-client">
                        <div id="dates-order">
                            <h3>Cliente: ${client.fantasia}</h3>
                            <h5>Data: ${formattedDate}</h5>
                            <h5>Pedido:  ${e.id}</h5>
                            <h5>Valor: ${formattedValue}</h5>
                        </div>
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
                const buttonExit = document.getElementById('btn-exit-details');
                buttonExit?.addEventListener('click', () => {
                    gridDetails.style.visibility = 'hidden'
                })
                const tableProducts = document.getElementById('table-products');
                if(tableProducts) {
                    products.map((product) => {
                        tableProducts.innerHTML += `
                            <tr>
                                <th>${product.nome}</th>
                                <th>${product.quantidade}</th>
                                <th>${product.quantidade_atendida}</th>
                            </tr>
                        `;
                    })
                }
            }
        })
    })
})

