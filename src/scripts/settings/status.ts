import { SettingsService } from '../../services/settings_service'

interface ListItem {
    id: number;
    nome: string;
    posicao: number;
    finalizado: number;
    inativo: number;
}

function moveUp(lista: ListItem[], id: number) {
    const index = lista.findIndex(item => item.id === id);
    if(index >= 0) {
        const item = lista[index];
        if(lista[index - 1]) {
            lista[index] = lista[index - 1];
            lista[index - 1] = item;
            lista[index].posicao += 1;
            lista[index - 1].posicao -= 1
            updateList(lista);
        }
    }
}

function moveDown(lista: ListItem[], id: number) {
    const index = lista.findIndex(item => item.id === id);
    if(index < lista.length - 1) {
        const item = lista[index];
        lista[index] = lista[index + 1];
        lista[index + 1] = item;
        lista[index].posicao -= 1;
        lista[index + 1].posicao += 1
        updateList(lista);
    }
}

function updateList(lista: ListItem[]) {
    let labelsStatus: string = '';
    lista.map(
        (e: any) => {
            const buttonDownId = `drop-down-${e.id}`;
            const buttonUpId = `drop-up-${e.id}`;
            labelsStatus += `
            <div id="row-status">
                <h4>${e.nome}</h4>
                <div id="buttons-arrow">
                    <button id="${buttonDownId}">
                        <span id="arrow-down">&#9660;</span>
                    </button>
    
                    <button id="${buttonUpId}">
                        <span id="arrow-up">&#9650;</span>
                    </button>
                </div>
            </div> \n
        `
        })
    const statusField = document.getElementById('setting-status')    
    
    if (statusField) {
        statusField.innerHTML = labelsStatus;
        lista.map((e) => {
            const buttonDown = document.getElementById(`drop-down-${e.id}`);
            const buttonUp = document.getElementById(`drop-up-${e.id}`);
            buttonDown?.addEventListener('click', () => {
                moveDown(lista, e.id);
            });
    
            buttonUp?.addEventListener('click', () => {
                moveUp(lista, e.id);
            });
        })
        console.log(lista);
    }
}

function addClickEvents(lista: ListItem[]) {
    lista.map((e) => {
        const buttonDown = document.getElementById(`drop-down-${e.id}`);
        const buttonUp = document.getElementById(`drop-up-${e.id}`);
        buttonDown?.addEventListener('click', () => {
            moveDown(lista, e.id);
        });

        buttonUp?.addEventListener('click', () => {
            moveUp(lista, e.id);
        });
    })
}


//FALTA DEIXAR DINAMICO A BASE DO FORNECEDOR
document.addEventListener('DOMContentLoaded', async () => {
    const settingsService = new SettingsService();
    const statusResponse: any = await settingsService.getStatusList('pluspedidos');
    const statusValues: ListItem[] = statusResponse.response
    let labelsStatus: string = '';
    statusValues.map(
        (e: ListItem) => { 
            const buttonDownId = `drop-down-${e.id}`;
            const buttonUpId = `drop-up-${e.id}`;

            labelsStatus += `
            <div id="row-status">
                <h4>${e.nome}</h4>
                <div id="buttons-arrow">
                    <button id="${buttonDownId}">
                        <span id="arrow-down">&#9660;</span>
                    </button>

                    <button id="${buttonUpId}">
                        <span id="arrow-up">&#9650;</span>
                    </button>
                </div>
            </div> \n
        `;
    });

    const statusField = document.getElementById('setting-status')    

    if (statusField) {
        statusField.innerHTML = labelsStatus;
        statusValues.map((e) => {
            const buttonDown = document.getElementById(`drop-down-${e.id}`);
            const buttonUp = document.getElementById(`drop-up-${e.id}`);
            buttonDown?.addEventListener('click', () => {
                moveDown(statusValues, e.id);
            });

            buttonUp?.addEventListener('click', () => {
                moveUp(statusValues, e.id);
            });
        })
    }
})