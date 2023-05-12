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
    colocar_vitrine_loja: boolean
}

const tablesName: TableNameDto = {
    "Classes": "classes",
    "Subclasses": "subclasses",
    "Fabricantes": "fabricantes",
    "Tabelas de preço": "tabelas_preco",
    "Clientes": "cli_for",
    "Prod/Serv": "prod_serv"
}

function updateList(filter: string, list: any)  {
    const contentPage = document.getElementById('content-page');
    if(contentPage) {
        contentPage.style.overflowY = 'scroll';
        contentPage.style.width = '100w'
        contentPage.style.flexDirection = 'column'
        contentPage.innerHTML = '';
        if(filter === 'classes' || filter === 'subclasses' || filter === 'fabricantes') {
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
            
        } else if(filter === 'tabelas_preco') {
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
        } else if(filter === 'cli_for'){
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
        } else {
            contentPage.innerHTML += `
                <select id="drop-filter">
                    <option value="codigo">Código</option>
                    <option value="codigo_barras">Código de barras</option>
                    <option value="nome">Nome</option>
                </select>
            `

            contentPage.innerHTML += `
                <table id="table-products">
                    <tr>
                        <th>Código</th>
                        <th>Código_Barras</th>
                        <th>Produto</th>
                    </tr>
                </table>`
            const tableBody = document.getElementById('table-products')
            if(tableBody) {
                list.map((e: ProdServDto) => {
                    tableBody.innerHTML += `
                        <tr>
                            <th>${e.codigo}</th>
                            <th>${e.codigo_barras}</th>
                            <th>${e.nome}</th>
                        </tr>
                    `
                })
            }
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
        const tableResponse: any = await subscribeService.getTableValues('pluspedidos', tableSelect);
        const tableValues: FirstsFiltersDto[] | TablesPriceDto[] | ClientDto[] | ProdServDto[] = tableResponse.response

        // if(tableSelect === 'classes' || tableSelect === 'subclasses' || tableSelect === 'fabricantes') {
        updateList(tableSelect, tableValues)
        // } else if(tableSelect === 'tabelas_preco') {

        // } else if(tableSelect === 'cli_for'){

        // } else {

        // }
      });
    });
})