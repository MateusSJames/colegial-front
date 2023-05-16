import { HomeService } from '../services/home_service'

interface FilterOrderDto {
    id: number;
    ordem_cli_for: number;
    sequencia_shop: number;
    st: string;
    fantasia: string;
}

function filterOrders() {
    const contentPage = document.getElementById('content-page');
    const details = document.getElementById('details');
    
    if(details) {
        details.style.display = 'none'
    }

    if(contentPage) {
        contentPage.style.overflowY = 'scroll';
        contentPage.style.flexDirection = 'column'
        let filterLabel = 'codigo'
        contentPage.innerHTML = '';
        contentPage.innerHTML += `
            <div id="filters-orders-page">
                <select id="drop-filter-order">
                    <option value="codigo">Código</option>
                    <option value="sequencia">Sequência</option>
                    <option value="status">Status</option>
                    <option value="cliente">Cliente</option>
                </select>
                <div id="section-filter-order">
                    <input type="text" id="input-filter" placeholder="Digite o ${filterLabel}">
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

        const buttonFilter = document.getElementById('btn-filter-order')
        buttonFilter?.addEventListener('click', async () => {

            const inputFieldFilter = document.getElementById('input-filter') as HTMLInputElement;
            if(inputFieldFilter) {
                const homeService = new HomeService();
                const homeResponse: any = await homeService.getOrdersByFilter('pluspedidos', filterLabel, inputFieldFilter.value);
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
                                        <th>${e.fantasia}</th>
                                    </tr>
                                `
                            })
                        } else {
                            tableBody.innerHTML += `<h2>Nenhum produto foi encontrado</h2>`
                        }
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
                    } else {
                        inputFieldFilter.placeholder = `Digite o ${selectedOption}`
                    }
                }
            });
        }
    }
}

export { filterOrders }
    
