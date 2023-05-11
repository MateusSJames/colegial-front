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
    codigo: number;
    nome: string;
}

const tablesName: TableNameDto = {
    "Classes": "classes",
    "Subclasses": "subclasses",
    "Fabricantes": "fabricantes",
    "Tabelas de preço": "tabelas_preco",
    "Clientes": "cli_for",
    "Prod/Serv": "prod_serv"
}

const typeOfDto: Record<keyof TableNameDto, any> = {
    Classes: "FirstsFiltersDto",
    Subclasses: "FirstsFiltersDto",
    Fabricantes: "FirstsFiltersDto",
    "Tabelas de preço": "tabelas_preco",
    Clientes: "cli_for",
    "Prod/Serv": "prod_serv",
};  

buttonCadastro?.addEventListener('click', () => {
    const filterContent = document.getElementById('filters');
    const contentPage = document.getElementById('content-page');

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
        // listStatus.map((e) => {
        //     filterContent.innerHTML += `
        //         <h3 id="filter-status-${e.id}">${e.nome}</h3>
        //     `;
        //     if(e.posicao == 0) {
        //         const firstStatus= document.getElementById(`filter-status-${e.id}`);
        //         if(firstStatus) {
        //             firstStatus.style.color = 'white'
        //         }
        //     }
        // })
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
        // const orderResponse: any = await serviceHome.getOrdersPendings('pluspedidos', h3.textContent)
        // let ordersPendings: OrderDto[] = orderResponse.response
        // const gridDetails = document.getElementById('grid-details');
        // if(gridDetails) {
        //     gridDetails.style.visibility = "hidden";
        //     gridDetails.innerHTML = '';
        // }
        // updateList(ordersPendings, listStatus, statusFilter);
      });
    });
})