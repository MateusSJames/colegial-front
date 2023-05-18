import { CadastroService } from '../services/cadastros_service'

const buttonCadastro = document.getElementById('cadastros')

interface TableNameDto {
    "Classes": string;
    "Subclasses": string;
    "Fabricantes": string;
    "Tabelas de preço": string;
    "Clientes": string;
    "Prod/Serv": string;
}

interface FirstsFiltersDto {
    id: number;
    ordem: number;
    codigo: number;
    nome: string;
}

interface TablesPriceDto {
    id: number;
    ordem: number;
    nome: string;
}

interface ClientDto {
    id: number,
    ordem: number,
    codigo: number,
    email: string,
    senha: string,
    fantasia: string,
    inativo: number,
    ordem_filial: number,
    ordem_tabelas_preco: number
}

interface ProdServDto {
    id: number,
    ordem: number,
    codigo: string,
    codigo_barras: string,
    nome: string,
    inativo: boolean,
    ordem_classe: number,
    ordem_subclasse: number,
    ordem_fabricante: number,
    unidade: string,
    tipo: string,
    web_obs1: string,
    web_obs2: string,
    peso_liq: number,
    peso_bruto: number,
    qtde_fracionada_casas_decimais: number,
    colocar_vitrine_loja: boolean,
    nome_classe: string,
    nome_subclasse: string,
    nome_fabricante: string
}

const tablesName: TableNameDto = {
    "Classes": "classes",
    "Subclasses": "subclasses",
    "Fabricantes": "fabricantes",
    "Tabelas de preço": "tabelas_preco",
    "Clientes": "cli_for",
    "Prod/Serv": "prod_serv"
}

let number = 1;
let numberCli = 1;
let numberTable = 1;
let numberFilter = 1;

function updateList(filter: string, list: any)  {
    const contentPage = document.getElementById('content-page');
    if(contentPage) {
        contentPage.style.overflowY = 'scroll';
        contentPage.style.width = '100w'
        contentPage.style.flexDirection = 'column'
        contentPage.innerHTML = '';
        if(filter === 'classes' || filter === 'subclasses' || filter === 'fabricantes') {
            
            contentPage.innerHTML += `
                <div id="section-pages">
                    <button id="btn-back-page">
                        <img src="../assets/seta-esquerda-paginacao.png" alt="return" id="page-next">
                    </button>
                    <button id="btn-next-page">
                        <img src="../assets/seta-direita.png" alt="next" id="page-back">
                    </button>
                </div>
            `
            
            contentPage.innerHTML += `
                <table id="table-products">
                    <tr>
                        <th>Código</th>
                        <th>${filter}</th>
                    </tr>
                </table>`
            const tableBody = document.getElementById('table-products')
            if(tableBody) {
                list.map((e: FirstsFiltersDto) => {
                    tableBody.innerHTML += `
                        <tr>
                            <th>${e.codigo}</th>
                            <th>${e.nome}</th>
                        </tr>
                    `
                })
            }

            const buttonNextPage = document.getElementById('btn-next-page')
            buttonNextPage?.addEventListener('click', async () => {
                numberFilter += 1;
                const subscribeService = new CadastroService();
                const tableResponse: any = await subscribeService.getTableValues('pluspedidos', filter, numberFilter.toString());
                if(tableResponse.status == 200) {
                    const tableValues: FirstsFiltersDto[] | TablesPriceDto[] | ClientDto[] | ProdServDto[] = tableResponse.response
        
                    updateList(filter, tableValues)
                } else {
                    updateList(filter, [])
                }
            })

            const buttonBackPage = document.getElementById('btn-back-page')
            buttonBackPage?.addEventListener('click', async () => {
                if(numberFilter > 1) {
                    numberFilter -= 1;
                }
                const subscribeService = new CadastroService();
                const tableResponse: any = await subscribeService.getTableValues('pluspedidos', filter, numberFilter.toString());
                if(tableResponse.status == 200) {
                    const tableValues: FirstsFiltersDto[] | TablesPriceDto[] | ClientDto[] | ProdServDto[] = tableResponse.response
        
                    updateList(filter, tableValues)
                } else {
                    updateList(filter, [])
                }
            })
            
        } else if(filter === 'tabelas_preco') {

            contentPage.innerHTML += `
                <div id="section-pages">
                    <button id="btn-back-page">
                        <img src="../assets/seta-esquerda-paginacao.png" alt="return" id="page-next">
                    </button>
                    <button id="btn-next-page">
                        <img src="../assets/seta-direita.png" alt="next" id="page-back">
                    </button>
                </div>
            `

            contentPage.innerHTML += `
                <table id="table-products">
                    <tr>
                        <th>Ordem</th>
                        <th>Tabela</th>
                    </tr>
                </table>`
            const tableBody = document.getElementById('table-products')
            if(tableBody) {
                list.map((e: TablesPriceDto) => {
                    tableBody.innerHTML += `
                        <tr>
                            <th>${e.ordem}</th>
                            <th>${e.nome}</th>
                        </tr>
                    `
                })
            }

            const buttonNextPage = document.getElementById('btn-next-page')
            buttonNextPage?.addEventListener('click', async () => {
                numberTable += 1;
                const subscribeService = new CadastroService();
                const tableResponse: any = await subscribeService.getTableValues('pluspedidos', 'tabelas_preco', numberTable.toString());
                if(tableResponse.status == 200) {
                    const tableValues: FirstsFiltersDto[] | TablesPriceDto[] | ClientDto[] | ProdServDto[] = tableResponse.response
        
                    updateList('tabelas_preco', tableValues)
                } else {
                    updateList('tabelas_preco', [])
                }
            })

            const buttonBackPage = document.getElementById('btn-back-page')
            buttonBackPage?.addEventListener('click', async () => {
                if(numberTable > 1) {
                    numberTable -= 1;
                }
                const subscribeService = new CadastroService();
                const tableResponse: any = await subscribeService.getTableValues('pluspedidos', 'tabelas_preco', numberTable.toString());
                if(tableResponse.status == 200) {
                    const tableValues: FirstsFiltersDto[] | TablesPriceDto[] | ClientDto[] | ProdServDto[] = tableResponse.response
        
                    updateList('tabelas_preco', tableValues)
                } else {
                    updateList('tabelas_preco', [])
                }
            })
        } else if(filter === 'cli_for'){
            
            let filterLabel = 'codigo'

            contentPage.innerHTML += `
                <div id="filters-prod-serv">
                    <select id="drop-filter">
                        <option value="codigo">Código</option>
                        <option value="email">Email</option>
                        <option value="fantasia">Nome</option>
                    </select>
                    <div id="section-filter">
                        <input type="text" id="input-filter" placeholder="Digite seu ${filterLabel}">
                        <button type="button" id="btn-filter-prod">Buscar</button> 
                    </div>               
                </div>
                <div id="section-pages">
                    <button id="btn-back-page">
                        <img src="../assets/seta-esquerda-paginacao.png" alt="return" id="page-next">
                    </button>
                    <button id="btn-next-page">
                        <img src="../assets/seta-direita.png" alt="next" id="page-back">
                    </button>
                </div>
            `
            
            contentPage.innerHTML += `
                <table id="table-products">
                    <tr>
                        <th>Código</th>
                        <th>Cliente</th>
                        <th>Email</th>
                    </tr>
                </table>`
            const tableBody = document.getElementById('table-products')
            if(tableBody) {
                list.map((e: ClientDto) => {
                    tableBody.innerHTML += `
                        <tr>
                            <th>${e.codigo}</th>
                            <th>${e.fantasia}</th>
                            <th>${e.email}</th>
                        </tr>
                    `
                })
            }

            const buttonFilter = document.getElementById('btn-filter-prod')
            buttonFilter?.addEventListener('click', async () => {
                const tableSelect = 'cli_for'
                const inputFieldFilter = document.getElementById('input-filter') as HTMLInputElement;
                if(inputFieldFilter) {
                    const subscribeService = new CadastroService();
                    const tableResponse: any = await subscribeService.getTableValues('pluspedidos', tableSelect, '1', filterLabel, inputFieldFilter.value);
                    if(tableResponse.status == 200) {
                        const tableValues: FirstsFiltersDto[] | TablesPriceDto[] | ClientDto[] | ProdServDto[] = tableResponse.response
            
                        updateList(tableSelect, tableValues)
                    } else {
                        updateList(tableSelect, [])
                    }
                }
            })

            const dropDownValue = document.getElementById('drop-filter') as HTMLSelectElement;
            if(dropDownValue) {
                dropDownValue.addEventListener('change', () => {
                    const selectedOption: any = dropDownValue.value;
                    filterLabel = selectedOption
                    const inputFieldFilter = document.getElementById('input-filter') as HTMLInputElement;
                    if(inputFieldFilter) {
                        if(filterLabel == 'fantasia') {
                            inputFieldFilter.placeholder = `Digite o nome`
                        } else {
                            inputFieldFilter.placeholder = `Digite o ${selectedOption}`
                        }

                    }
                });
            }

            const buttonNextPage = document.getElementById('btn-next-page')
            buttonNextPage?.addEventListener('click', async () => {
                numberCli += 1;
                const subscribeService = new CadastroService();
                const tableResponse: any = await subscribeService.getTableValues('pluspedidos', 'cli_for', numberCli.toString());
                if(tableResponse.status == 200) {
                    const tableValues: FirstsFiltersDto[] | TablesPriceDto[] | ClientDto[] | ProdServDto[] = tableResponse.response
        
                    updateList('cli_for', tableValues)
                } else {
                    updateList('cli_for', [])
                }
            })

            const buttonBackPage = document.getElementById('btn-back-page')
            buttonBackPage?.addEventListener('click', async () => {
                if(numberCli > 1) {
                    numberCli -= 1;
                }
                const subscribeService = new CadastroService();
                const tableResponse: any = await subscribeService.getTableValues('pluspedidos', 'cli_for', numberCli.toString());
                if(tableResponse.status == 200) {
                    const tableValues: FirstsFiltersDto[] | TablesPriceDto[] | ClientDto[] | ProdServDto[] = tableResponse.response
        
                    updateList('cli_for', tableValues)
                } else {
                    updateList('cli_for', [])
                }
            })
        } else {
            let filterLabel = 'codigo'
            contentPage.innerHTML += `
                <div id="filters-prod-serv">
                    <select id="drop-filter">
                        <option value="codigo">Código</option>
                        <option value="codigo_barras">Código de barras</option>
                        <option value="nome">Nome</option>
                    </select>
                    <div id="section-filter">
                        <input type="text" id="input-filter" placeholder="Digite seu ${filterLabel}">
                        <button type="button" id="btn-filter-prod">Buscar</button> 
                    </div>               
                </div>

                <div id="section-pages">
                    <button id="btn-back-page">
                        <img src="../assets/seta-esquerda-paginacao.png" alt="return" id="page-next">
                    </button>
                    <button id="btn-next-page">
                        <img src="../assets/seta-direita.png" alt="next" id="page-back">
                    </button>
                </div>
            `

            contentPage.innerHTML += `
                <table id="table-products">
                    <tr>
                        <th>Código</th>
                        <th>Código_Barras</th>
                        <th>Produto</th>
                        <th>Classe</th>
                        <th>Subclasse</th>
                        <th>Fabricante</th>
                    </tr>
                </table>`
            const tableBody = document.getElementById('table-products')
            if(tableBody) {
                if(list) {
                    list.map((e: ProdServDto) => {
                        tableBody.innerHTML += `
                            <tr>
                                <th>${e.codigo}</th>
                                <th>${e.codigo_barras}</th>
                                <th>${e.nome}</th>
                                <th>${e.nome_classe}</th>
                                <th>${e.nome_subclasse}</th>
                                <th>${e.nome_fabricante}</th>
                            </tr>
                        `
                    })
                } else {
                    tableBody.innerHTML += `<h2>Nenhum produto foi encontrado</h2>`
                }
            }

            const buttonFilter = document.getElementById('btn-filter-prod')
            buttonFilter?.addEventListener('click', async () => {
                const tableSelect = 'prod_serv'
                const inputFieldFilter = document.getElementById('input-filter') as HTMLInputElement;
                if(inputFieldFilter) {
                    const subscribeService = new CadastroService();
                    const tableResponse: any = await subscribeService.getTableValues('pluspedidos', tableSelect, '1', filterLabel, inputFieldFilter.value);
                    if(tableResponse.status == 200) {
                        const tableValues: FirstsFiltersDto[] | TablesPriceDto[] | ClientDto[] | ProdServDto[] = tableResponse.response
            
                        updateList(tableSelect, tableValues)
                    } else {
                        updateList(tableSelect, [])
                    }
                }
            })

            const dropDownValue = document.getElementById('drop-filter') as HTMLSelectElement;
            if(dropDownValue) {
                dropDownValue.addEventListener('change', () => {
                    const selectedOption: any = dropDownValue.value;
                    filterLabel = selectedOption
                    const inputFieldFilter = document.getElementById('input-filter') as HTMLInputElement;
                    if(inputFieldFilter) {
                        if(filterLabel == 'codigo_barras') {
                            inputFieldFilter.placeholder = `Digite o código de barras`
                        } else {
                            inputFieldFilter.placeholder = `Digite o ${selectedOption}`
                        }

                    }
                });
            }

            const buttonNextPage = document.getElementById('btn-next-page')
            buttonNextPage?.addEventListener('click', async () => {
                number += 1;
                const subscribeService = new CadastroService();
                const tableResponse: any = await subscribeService.getTableValues('pluspedidos', 'prod_serv', number.toString());
                if(tableResponse.status == 200) {
                    const tableValues: FirstsFiltersDto[] | TablesPriceDto[] | ClientDto[] | ProdServDto[] = tableResponse.response
        
                    updateList('prod_serv', tableValues)
                } else {
                    updateList('prod_serv', [])
                }
            })

            const buttonBackPage = document.getElementById('btn-back-page')
            buttonBackPage?.addEventListener('click', async () => {
                if(number > 1) {
                    number -= 1;
                }
                const subscribeService = new CadastroService();
                const tableResponse: any = await subscribeService.getTableValues('pluspedidos', 'prod_serv', number.toString());
                if(tableResponse.status == 200) {
                    const tableValues: FirstsFiltersDto[] | TablesPriceDto[] | ClientDto[] | ProdServDto[] = tableResponse.response
        
                    updateList('prod_serv', tableValues)
                } else {
                    updateList('prod_serv', [])
                }
            })
        }
    }
}

buttonCadastro?.addEventListener('click', () => {
    const filterContent = document.getElementById('filters');
    const contentPage = document.getElementById('content-page');
    const details = document.getElementById('details');
    if(details) {
        details.style.display = 'none'
    }
    if(filterContent != null) {
        filterContent.innerHTML = '';
        filterContent.innerHTML += `
            <h3 id="filter-table">Classes</h3>
            <h3 id="filter-table">Subclasses</h3>
            <h3 id="filter-table">Fabricantes</h3>
            <h3 id="filter-table">Tabelas de preço</h3>
            <h3 id="filter-table">Clientes</h3>
            <h3 id="filter-table">Prod/Serv</h3>
        `;
    }
    if(contentPage) {
        contentPage.innerHTML = '';
        contentPage.innerHTML = '<h2>Tela de Cadastros</h2>'
    }

    const filtersDiv = document.getElementById('filters');
    const h3List = filtersDiv?.querySelectorAll('h3');
    let statusFilter: keyof TableNameDto;
    statusFilter = 'Classes';
    h3List?.forEach((h3) => {
      h3.addEventListener('click', async () => {
        const allH3s = document.querySelectorAll('#filters h3'); // Seleciona todos os h3s dentro da div filters
        allH3s.forEach(h3Element => {
            if (h3Element instanceof HTMLHeadingElement) {
                h3Element.style.color = 'black'
            }
        });
        h3.style.color = 'white';
        if(h3.textContent) {
            statusFilter = h3.textContent as keyof TableNameDto;
        }
        const tableSelect = tablesName[statusFilter]
        const subscribeService = new CadastroService();
        const tableResponse: any = await subscribeService.getTableValues('pluspedidos', tableSelect, '1');
        const tableValues: FirstsFiltersDto[] | TablesPriceDto[] | ClientDto[] | ProdServDto[] = tableResponse.response

        number = 1;
        numberCli = 1;
        numberTable = 1;
        numberFilter = 1;
        updateList(tableSelect, tableValues)
      });
    });
})