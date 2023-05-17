import { HomeService } from '../services/home_service'
import { SettingsService } from '../services/settings_service'

interface FilterOrderDto {
    id: number;
    ordem_cli_for: number;
    sequencia_shop: number;
    st: string;
    fantasia: string;
    total: number;
	data_atualizacao: string;
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

async function filterOrders() {
    const contentPage = document.getElementById('content-page');
    const details = document.getElementById('details');
    
    if(details) {
        details.style.display = 'none'
    }

    if(contentPage) {
        contentPage.style.overflowY = 'scroll';
        contentPage.style.flexDirection = 'column'
        let filterLabel = 'pedido online'
        let filterStatus = 'todos'
        contentPage.innerHTML = '';
        contentPage.innerHTML += `
            <div id="filters-orders-page">
                <div>
                    <h5>Buscar pedido por:</h5>
                    <select id="drop-filter-order">
                        <option value="codigo">Pedido online</option>
                        <option value="sequencia">Sequência</option>
                        <option value="cliente">Cliente</option>
                    </select>
                </div>
                <div id="section-filter-order">
                    <input type="text" id="input-filter-order" placeholder="Digite o ${filterLabel}">
                    <select id="drop-status-order">
                        <option value="todos">Todos</option>
                    </select>
                    <button type="button" id="btn-filter-order">Buscar</button> 
                </div>               
            </div>
        `;

        contentPage.innerHTML += `
            <table id="table-orders">
                <tr>
                    <th>Código</th>
                    <th>Sequência</th>
                    <th>Status</th>
                    <th>Cliente</th>
                </tr>
            </table>`
        
        const serviceStatus = new SettingsService();
                        
        const statusResponse: any = await serviceStatus.getStatusList('pluspedidos')
        let listStatus: StatusDto[] = statusResponse.response

        const dropDownStatus = document.getElementById("drop-status-order");
            if(dropDownStatus) {
                listStatus.map((st) => {
                    dropDownStatus.innerHTML += `
                        <option value="${st.nome}">${st.nome}</option>
                    `
            })
        }

        const buttonFilter = document.getElementById('btn-filter-order')
        buttonFilter?.addEventListener('click', async () => {

            const inputFieldFilter = document.getElementById('input-filter-order') as HTMLInputElement;
            if(inputFieldFilter) {
                const homeService = new HomeService();
                const homeResponse: any = await homeService.getOrdersByFilter('pluspedidos', filterLabel, inputFieldFilter.value, filterStatus);
                if(homeResponse.status == 200) {
                    const orders: FilterOrderDto[] = homeResponse.response
                    const tableBody = document.getElementById('table-orders')
                    if(tableBody) {
                        tableBody.innerHTML = `
                            <tr>
                                <th>Código</th>
                                <th>Sequência</th>
                                <th>Status</th>
                                <th>Cliente</th>
                            </tr>
                        `
                        if(orders) {
                            orders.map((e) => {
                                tableBody.innerHTML += `
                                    <tr>
                                        <th>${e.id}</th>
                                        <th>${e.sequencia_shop}</th>
                                        <th>${e.st}</th>
                                        <th>
                                            <div id="show-details">
                                                ${e.fantasia}
                                                <button id="btn-show-details-${e.id}">
                                                    <img src="../assets/lupa.png" alt="return" id="search-details">
                                                </button>
                                            </div>
                                        </th>
                                    </tr>
                                `;
                            })
                        } else {
                            tableBody.innerHTML += `<h2>Nenhum produto foi encontrado</h2>`
                        }

                        const serviceStatus = new SettingsService();
                        
                        const statusResponse: any = await serviceStatus.getStatusList('pluspedidos')
                        let listStatus: StatusDto[] = statusResponse.response

                        orders.map((e) => {

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

                            const buttonShowDetails = document.getElementById(`btn-show-details-${e.id}`)
                            buttonShowDetails?.addEventListener('click', async () => {
                                await showDetailsGridOfOrder(e, listStatus, formattedDate, formattedValue)
                                const details = document.getElementById('details');
                                if(details) {
                                    details.style.display = 'flex'
                                }
                            })
                        })
                    }
                }
            }
        })

        const dropDownValue = document.getElementById('drop-filter-order') as HTMLSelectElement;
        if(dropDownValue) {
            dropDownValue.addEventListener('change', () => {
                const selectedOption: any = dropDownValue.value;
                filterLabel = selectedOption
                const inputFieldFilter = document.getElementById('input-filter') as HTMLInputElement;
                if(inputFieldFilter) {
                    if(filterLabel == 'sequencia') {
                        inputFieldFilter.placeholder = `Digite a sequência`
                    } else if(filterLabel == 'codigo') {
                        inputFieldFilter.placeholder = "Digite o pedido online"
                    } else {
                        inputFieldFilter.placeholder = `Digite o ${selectedOption}`
                    }
                }
            });
        }

        const dropDownStatusValue = document.getElementById('drop-status-order') as HTMLSelectElement;
        if(dropDownStatusValue) {
            dropDownStatusValue.addEventListener('change', () => {
                const selectedOption: any = dropDownStatusValue.value;
                filterStatus = selectedOption
                alert(filterStatus)
            });
        }
    }
}

async function showDetailsGridOfOrder(pedido: FilterOrderDto, listStatus: StatusDto[], date: string, value: string)  {
    const homeService = new HomeService()
    const clientResponse: any = await homeService.getClientByOrder('pluspedidos', pedido.ordem_cli_for.toString())
    const productResponse: any = await homeService.getProductsByOrder('pluspedidos', pedido.id.toString());
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
                    <h5>Data: ${date}</h5>
                    <h5>Pedido:  ${pedido.id}</h5>
                    <h5>Valor: ${value}</h5>
                </div>
            </div>
            <div id="body-products">
                <table id="table-products">
                    <tr>
                        <th>Produto</th>
                        <th>Complemento</th>
                        <th id="hd-valor">Valor</th>
                        <th id="hd-solicitada">Solicitada</th>
                        <th id="hd-atendida">Atendida</th>
                    </tr>
                </table>                  
            </div>
            <div id="fixed-footer">
                <select id="drop-status"></select>
                <button id="btn-update-status">
                    <img src="../assets/verificar.png" alt="Logo" id="button-cancel">
                </button>
                <div id="alert-content">
                    <h3>Atualizando pedido ...</h3>
                </div>
                <button id="btn-update-order">
                    Salvar
                </button>
            </div> 
        `
        const dropDownStatus = document.getElementById("drop-status");
        if(dropDownStatus) {
            dropDownStatus.innerHTML = '';
            dropDownStatus.innerHTML += `
                <option value="${listStatus[0].id}">${pedido.st}</option>
            `
            listStatus.map((st) => {
                if(st.nome != pedido.st) {
                    dropDownStatus.innerHTML += `
                        <option value="${st.id}">${st.nome}</option>
                    `
                }
            })
        }
        const buttonExit = document.getElementById('btn-exit-details');
        buttonExit?.addEventListener('click', () => {
            gridDetails.style.visibility = 'hidden';
            const details = document.getElementById('details');
            if(details) {
                details.style.display = 'none'
            }
        })
        const tableProducts = document.getElementById('table-products');
        if(tableProducts) {
            products.map((product) => {
                const formattedProductValue = new Intl.NumberFormat('pt-BR', {
                    style: 'currency',
                    currency: 'BRL'
                }).format(product.valor);
                tableProducts.innerHTML += `
                    <tr>
                        <th>${product.nome}</th>
                        <th>${product.complemento}</th>
                        <th id="value-product">${formattedProductValue}</th>
                        <th id="row-solicitado">
                            ${product.quantidade}
                            <span id="arrow-right-${product.ordem_prod_serv}">&rarr;</span> <!-- seta para a direita -->
                        </th>
                        <th id="th-atendida">
                            <input id="input-atendida-${product.ordem_prod_serv}" value="${product.quantidade_atendida}">
                        </th>
                    </tr>
                `;
            })
            products.map((product) => {
                const arrowRight = document.getElementById(`arrow-right-${product.ordem_prod_serv}`)
                arrowRight?.addEventListener('click', () => {
                    const inputQtdAtendida = document.getElementById(`input-atendida-${product.ordem_prod_serv}`) as HTMLInputElement
                    if(inputQtdAtendida) {
                        inputQtdAtendida.value = product.quantidade.toString();
                    }
                })
            })
        }

        const buttonUpdateStatus = document.getElementById('btn-update-status');
        const dropDownValue = document.getElementById('drop-status') as HTMLSelectElement;
        let idStatus: string = listStatus[0].id.toString();
        if(dropDownValue) {
            dropDownValue.addEventListener('change', () => {
                const selectedOption: any = dropDownValue.value;
                idStatus = selectedOption
            });
        }
        buttonUpdateStatus?.addEventListener('click', async () => {
            const status = {
                id_pedido: pedido.id,
                id_status:  parseInt(idStatus)
            }
            const alertContent = document.getElementById('alert-content')
            if(alertContent) {
                alertContent.style.visibility = 'visible'
                await homeService.updateStatusOrder('pluspedidos', status);
                const gridDetails = document.getElementById('grid-details');
                if(gridDetails) {
                    gridDetails.style.visibility = "hidden";
                    alertContent.style.visibility = 'hidden';
                    gridDetails.innerHTML = '';
                    const details = document.getElementById('details');
                    if(details) {
                        details.style.display = 'none'
                        const tableBody = document.getElementById('table-orders')
                        if(tableBody) {
                            tableBody.innerHTML = `
                                <tr>
                                    <th>Código</th>
                                    <th>Sequência</th>
                                    <th>Status</th>
                                    <th>Cliente</th>
                                </tr>
                            `
                        }

                        const inputFieldFilter = document.getElementById('input-filter') as HTMLInputElement;
                        if(inputFieldFilter) {
                            inputFieldFilter.textContent = '';
                        }
                    }
                }
            }   
        })

        const buttonUpdateOrder = document.getElementById('btn-update-order');
        buttonUpdateOrder?.addEventListener('click', () => {
            const alertContent = document.getElementById('alert-content')
            if(alertContent) {
                alertContent.style.visibility = 'visible'
                products.map(async (product) => {
                    const inputQtdAtendida = document.getElementById(`input-atendida-${product.ordem_prod_serv}`) as HTMLInputElement
                    if(inputQtdAtendida) {
                        const productBody = {
                            quantidade_atendida: parseFloat(inputQtdAtendida.value),
                            id_pedido: product.id_pedido,
                            ordem_prod_serv:  product.ordem_prod_serv
                        }
                        await homeService.updateProductByOrder('pluspedidos', productBody)
                    }
                })
                alertContent.style.visibility = "hidden"
                alert('ATUALIZAÇÃO REGISTRADA')
            }
        })
    }
}

export { filterOrders }
    
