const buttonFilters = document.getElementById('filter-status-search');

function filterOrders() {
    const contentPage = document.getElementById('content-page');
    const details = document.getElementById('details');

    if(details) {
        details.style.display = 'none'
    }

    if(contentPage) {
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

        const buttonFilter = document.getElementById('btn-filter-order')
        buttonFilter?.addEventListener('click', async () => {
            alert('OLA BUSQUE ORDER')
            // const tableSelect = 'prod_serv'
            // const inputFieldFilter = document.getElementById('input-filter') as HTMLInputElement;
            // if(inputFieldFilter) {
            //     const subscribeService = new CadastroService();
            //     const tableResponse: any = await subscribeService.getTableValues('pluspedidos', tableSelect, '1', filterLabel, inputFieldFilter.value);
            //     if(tableResponse.status == 200) {
            //         const tableValues: FirstsFiltersDto[] | TablesPriceDto[] | ClientDto[] | ProdServDto[] = tableResponse.response
        
            //         updateList(tableSelect, tableValues)
            //     } else {
            //         updateList(tableSelect, [])
            //     }
            // }
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
    
