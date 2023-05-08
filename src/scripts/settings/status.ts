import { SettingsService } from '../../services/settings_service'

interface ListItem {
    id: number;
    nome: string;
    posicao: number;
    finalizado: number;
    inativo: number;
}

let finalListSubmit: ListItem[] = [];
let initListSubmit: ListItem[] = [];

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
            finalListSubmit = lista;
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
        finalListSubmit = lista;
    }
}

function updateList(lista: ListItem[]) {
    let labelsStatus: string = '';
    lista.map(
        (e: any) => {
            const buttonDownId = `drop-down-${e.id}`;
            const buttonUpId = `drop-up-${e.id}`;
            const buttonEditId = `btn-edit-status-${e.id}`;
            const buttonDeleteId = `btn-delete-${e.id}`;
            const buttonSaveId = `btn-check-${e.id}`;
            const buttonCancelId = `btn-cancel-${e.id}`;
            const labelStatusId = `label-status-${e.id}`;
            const inputStatusId = `input-status-${e.id}`;

            labelsStatus += `
            <div id="row-status">
                <div>
                    <h4 id="${labelStatusId}">${e.nome}</h4>
                    <div id ="row-edit">
                        <input id="${inputStatusId}" type="text">
                        <button id="${buttonSaveId}">
                            <img src="../../assets/verificar.png" alt="Logo" id="button-check">
                        </button>
                        <button id="${buttonCancelId}">
                            <img src="../../assets/cancelar.png" alt="Logo" id="button-cancel">
                        </button>
                    </div>
                </div>
                <div id="buttons-arrow">
                    <button id="${buttonEditId}">
                        <img src="../../assets/editar.png" alt="Logo" id="button-edit">
                    </button>
                    <button id="${buttonDeleteId}">
                        <img src="../../assets/excluir.png" alt="Logo" id="button-delete">
                    </button>
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
            const buttonEdit = document.getElementById(`btn-edit-status-${e.id}`);
            const buttonDelete = document.getElementById(`btn-delete-${e.id}`)
            const labelStatusId = document.getElementById(`label-status-${e.id}`);
            const buttonSave = document.getElementById(`btn-check-${e.id}`);
            const buttonCancel = document.getElementById(`btn-cancel-${e.id}`);
            const inputEdit = (document.getElementById(`input-status-${e.id}`) as HTMLInputElement)

            if(inputEdit != null && labelStatusId?.textContent != null) {
                inputEdit.value = labelStatusId.textContent
            }

            buttonDown?.addEventListener('click', () => {
                const buttonSubmitStatus = document.getElementById('btn-update-status')
                if(buttonSubmitStatus) {
                    buttonSubmitStatus.style.visibility = "visible";
                }
                moveDown(lista, e.id);
            });
    
            buttonUp?.addEventListener('click', () => {
                const buttonSubmitStatus = document.getElementById('btn-update-status')
                if(buttonSubmitStatus) {
                    buttonSubmitStatus.style.visibility = "visible";
                }
                moveUp(lista, e.id);
            });

            buttonEdit?.addEventListener('click', () => {
                buttonEdit.style.visibility = "hidden";
                inputEdit.style.visibility = "visible";
                if(buttonDelete) {
                    buttonDelete.style.visibility = "hidden";
                }
                if(buttonSave != null) {
                    buttonSave.style.visibility = "visible";
                    buttonSave.addEventListener('click', async () => {
                        const settingsService = new SettingsService();
                        try {
                            const alertContent = document.getElementById('alert-content')
                            if(alertContent != null) {
                                alertContent.style.visibility = "visible";
                                alertContent.style.backgroundColor = 'orange';
                                alertContent.innerHTML = `
                                        <h3>Enviando atualizações ...</h3>
                                    `
                            }
                            await settingsService.setStatusPosition('pluspedidos', {
                                id: e.id,
                                nome: inputEdit.value,
                                posicao: e.posicao
                            });
                            if(alertContent != null) {
                                alertContent.style.visibility = "visible";
                                alertContent.style.backgroundColor = 'green';
                                alertContent.innerHTML = `
                                        <h3>Dados atualizados com sucesso</h3>
                                    `
                                await setTimeout(() => {
                                    alertContent.style.visibility = "hidden";
                                }, 3000);
                                location.reload()
                            }
                        } catch {
                            const alertContent = document.getElementById('alert-content')
                            if(alertContent != null) {
                                alertContent.style.visibility = "visible";
                                alertContent.style.backgroundColor = 'red';
                                alertContent.innerHTML = `
                                        <h3>Erro ao atualizar posições</h3>
                                    `
                                setTimeout(() => {
                                    alertContent.style.visibility = "hidden";
                                }, 3000);
                            }
                        }
                    })
                }
                if(buttonCancel != null) {
                    buttonCancel.style.visibility = "visible";
                }
            })

            buttonCancel?.addEventListener('click', async () => {
                const input = (document.getElementById(`input-status-${e.id}`) as HTMLInputElement)
                input.style.visibility = "hidden";
                if(buttonEdit) {
                    buttonEdit.style.visibility = "visible";
                }
                if(buttonDelete) {
                    buttonDelete.style.visibility = "visible";
                }
                buttonCancel.style.visibility = "hidden";
                if(buttonSave != null) {
                    buttonSave.style.visibility = "hidden";
                }
            })
            
            buttonDelete?.addEventListener('click', async () => {
                const settingsService = new SettingsService();
                try {
                    const indexRemove = lista.findIndex(item => item.id === e.id)
                    if(indexRemove != -1) {
                        const alertContent = document.getElementById('alert-content')
                        if(alertContent != null) {
                            alertContent.style.visibility = "visible";
                            alertContent.style.backgroundColor = 'white';
                            alertContent.style.color = 'black';
                            alertContent.style.border = '1px solid black';
                            alertContent.style.flexDirection = 'column';
                            alertContent.innerHTML = `
                                <div id="pop-up-content">
                                    <h4>Gostaria de excluir esse status ?</h4>
                                </div>
                                <div id="pop-up-body">
                                    <button id="finish-delete">Sim</button>
                                    <button id="cancel-delete">Não</button>
                                </div>
                            `;
                            const finishDelete = document.getElementById('finish-delete');
                            const cancelDelete = document.getElementById('cancel-delete');
                            finishDelete?.addEventListener('click', async () => {
                                alertContent.innerHTML = `
                                    <h3>Deletando status ...</h3>
                                `
                                alertContent.style.backgroundColor = 'orange';
                                alertContent.style.color = 'white';
                                alertContent.style.border = '0';
                                const response: any = await settingsService.deleteStatus('pluspedidos', lista[indexRemove].id.toString());
                                if(response.status == 200) {
                                    lista.splice(indexRemove, 1);
                                    for (let i = indexRemove; i < lista.length; i ++) {
                                        lista[i].posicao = lista[i].posicao - 1;
                                    }
                                    for(let i = 0; i < lista.length; i ++) {
                                        const element: ListItem = lista[i];
                                        await settingsService.setStatusPosition('pluspedidos', element);
                                    }
                                    if(alertContent != null) {
                                        alertContent.style.visibility = "visible";
                                        alertContent.style.backgroundColor = 'green';
                                        alertContent.innerHTML = `
                                                <h3>Status deletado com sucesso</h3>
                                            `
                                        location.reload()
                                    }
                                } else {
                                    alertContent.style.visibility = "visible";
                                    alertContent.style.backgroundColor = 'white';
                                    alertContent.style.color = 'black';
                                    alertContent.style.border = '1px solid black';
                                    alertContent.style.flexDirection = 'column';
                                    alertContent.innerHTML = `
                                        <div id="pop-up-content">
                                            <h4>Esse status está em uso, gostaria de inativar ?</h4>
                                        </div>
                                        <div id="pop-up-body">
                                            <button id="finish-delete">Sim</button>
                                            <button id="cancel-delete">Não</button>
                                        </div>
                                    `;
                                    const finishDelete = document.getElementById('finish-delete');
                                    const cancelDelete = document.getElementById('cancel-delete');
                                    
                                    finishDelete?.addEventListener('click', async () => {
                                        alertContent.innerHTML = `
                                            <h3>Inativando status ...</h3>
                                        `
                                        alertContent.style.backgroundColor = 'orange';
                                        alertContent.style.color = 'white';
                                        alertContent.style.border = '0';
                                        
                                        for (let i = indexRemove; i < lista.length; i ++) {
                                            lista[i].posicao = lista[i].posicao - 1;
                                        }
                                        for(let i = 0; i < lista.length; i ++) {
                                            const element: ListItem = lista[i];
                                            await settingsService.setStatusPosition('pluspedidos', element);
                                        }

                                        await settingsService.setStatusPosition('pluspedidos', {
                                            id: e.id,
                                            nome: e.nome,
                                            posicao: -1,
                                        });
                                        
                                        if(alertContent != null) {
                                            alertContent.style.visibility = "visible";
                                            alertContent.style.backgroundColor = 'green';
                                            alertContent.innerHTML = `
                                                    <h3>Status inativado com sucesso</h3>
                                                `
                                            location.reload()
                                        }
                                    })
                                    
                                    cancelDelete?.addEventListener('click', () => {
                                        alertContent.style.visibility = "hidden";
                                    })
                                }
                                
                            })
                            cancelDelete?.addEventListener('click', () => {
                                alertContent.style.visibility = "hidden";
                            })
                        }
                    }
                } catch {
                    const alertContent = document.getElementById('alert-content')
                    if(alertContent != null) {
                        alertContent.style.visibility = "visible";
                        alertContent.style.backgroundColor = 'red';
                        alertContent.innerHTML = `
                                <h3>Erro ao atualizar posições</h3>
                            `
                        setTimeout(() => {
                            alertContent.style.visibility = "hidden";
                        }, 3000);
                    }
                }
                
            })
        })
    }
}

//FALTA DEIXAR DINAMICO A BASE DO FORNECEDOR
document.addEventListener('DOMContentLoaded', async () => {
    const settingsService = new SettingsService();
    const statusResponse: any = await settingsService.getStatusList('pluspedidos');
    const statusValues: ListItem[] = statusResponse.response
    let labelsStatus: string = '';
    initListSubmit = statusValues;
    statusValues.map(
        (e: ListItem) => {
            const buttonDownId = `drop-down-${e.id}`;
            const buttonUpId = `drop-up-${e.id}`;
            const buttonEditId = `btn-edit-status-${e.id}`;
            const buttonDeleteId = `btn-delete-${e.id}`;
            const buttonSaveId = `btn-check-${e.id}`;
            const buttonCancelId = `btn-cancel-${e.id}`;
            const labelStatusId = `label-status-${e.id}`;
            const inputStatusId = `input-status-${e.id}`;

            labelsStatus += `
            <div id="row-status">
                <div>
                    <h4 id="${labelStatusId}">${e.nome}</h4>
                    <div id ="row-edit">
                        <input id="${inputStatusId}" type="text">
                        <button id="${buttonSaveId}">
                            <img src="../../assets/verificar.png" alt="Logo" id="button-check">
                        </button>
                        <button id="${buttonCancelId}">
                            <img src="../../assets/cancelar.png" alt="Logo" id="button-cancel">
                        </button>
                    </div>
                </div>
                <div id="buttons-arrow">
                    <button id="${buttonEditId}">
                        <img src="../../assets/editar.png" alt="Logo" id="button-edit">
                    </button>
                    <button id="${buttonDeleteId}">
                        <img src="../../assets/excluir.png" alt="Logo" id="button-delete">
                    </button>
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
            const buttonEdit = document.getElementById(`btn-edit-status-${e.id}`);
            const buttonDelete = document.getElementById(`btn-delete-${e.id}`)
            const labelStatusId = document.getElementById(`label-status-${e.id}`);
            const buttonSave = document.getElementById(`btn-check-${e.id}`);
            const buttonCancel = document.getElementById(`btn-cancel-${e.id}`);
            const inputEdit = (document.getElementById(`input-status-${e.id}`) as HTMLInputElement)

            if(inputEdit != null && labelStatusId?.textContent != null) {
                inputEdit.value = labelStatusId.textContent
            }
            
            buttonDown?.addEventListener('click', () => {
                const buttonSubmitStatus = document.getElementById('btn-update-status')
                if(buttonSubmitStatus) {
                    buttonSubmitStatus.style.visibility = "visible";
                }
                moveDown(statusValues, e.id);
            });

            buttonUp?.addEventListener('click', () => {
                const buttonSubmitStatus = document.getElementById('btn-update-status')
                if(buttonSubmitStatus) {
                    buttonSubmitStatus.style.visibility = "visible";
                }
                moveUp(statusValues, e.id);
            });
            buttonEdit?.addEventListener('click', () => {
                buttonEdit.style.visibility = "hidden";
                inputEdit.style.visibility = "visible";
                if(buttonDelete) {
                    buttonDelete.style.visibility = "hidden";
                }
                if(buttonSave != null) {
                    buttonSave.style.visibility = "visible";
                    buttonSave.addEventListener('click', async () => {
                        const settingsService = new SettingsService();
                        try {
                            const alertContent = document.getElementById('alert-content')
                            if(alertContent != null) {
                                alertContent.style.visibility = "visible";
                                alertContent.style.backgroundColor = 'orange';
                                alertContent.innerHTML = `
                                        <h3>Enviando atualizações ...</h3>
                                    `
                            }
                            await settingsService.setStatusPosition('pluspedidos', {
                                id: e.id,
                                nome: inputEdit?.value,
                                posicao: e.posicao
                            });
                            if(alertContent != null) {
                                alertContent.style.visibility = "visible";
                                alertContent.style.backgroundColor = 'green';
                                alertContent.innerHTML = `
                                        <h3>Dados atualizados com sucesso</h3>
                                    `
                                await setTimeout(() => {
                                    alertContent.style.visibility = "hidden";
                                }, 3000);
                                location.reload()
                            }
                        } catch {
                            const alertContent = document.getElementById('alert-content')
                            if(alertContent != null) {
                                alertContent.style.visibility = "visible";
                                alertContent.style.backgroundColor = 'red';
                                alertContent.innerHTML = `
                                        <h3>Erro ao atualizar posições</h3>
                                    `
                                setTimeout(() => {
                                    alertContent.style.visibility = "hidden";
                                }, 3000);
                            }
                        }
                    })
                }
                if(buttonCancel != null) {
                    buttonCancel.style.visibility = "visible";
                }
            })
            buttonCancel?.addEventListener('click', async () => {
                const input = (document.getElementById(`input-status-${e.id}`) as HTMLInputElement)
                input.style.visibility = "hidden";
                if(buttonEdit) {
                    buttonEdit.style.visibility = "visible";
                }
                if(buttonDelete) {
                    buttonDelete.style.visibility = "visible";
                }
                buttonCancel.style.visibility = "hidden";
                if(buttonSave != null) {
                    buttonSave.style.visibility = "hidden";
                }
            })
            buttonDelete?.addEventListener('click', async () => {
                const settingsService = new SettingsService();
                try {
                    const indexRemove = statusValues.findIndex(item => item.id === e.id)
                    if(indexRemove != -1) {
                        const alertContent = document.getElementById('alert-content')
                        if(alertContent != null) {
                            alertContent.style.visibility = "visible";
                            alertContent.style.backgroundColor = 'white';
                            alertContent.style.color = 'black';
                            alertContent.style.border = '1px solid black';
                            alertContent.style.flexDirection = 'column';
                            alertContent.innerHTML = `
                                <div id="pop-up-content">
                                    <h4>Gostaria de excluir esse status ?</h4>
                                </div>
                                <div id="pop-up-body">
                                    <button id="finish-delete">Sim</button>
                                    <button id="cancel-delete">Não</button>
                                </div>
                            `;
                            const finishDelete = document.getElementById('finish-delete');
                            const cancelDelete = document.getElementById('cancel-delete');
                            finishDelete?.addEventListener('click', async () => {
                                alertContent.innerHTML = `
                                    <h3>Deletando status ...</h3>
                                `
                                alertContent.style.backgroundColor = 'orange';
                                alertContent.style.color = 'white';
                                alertContent.style.border = '0';
                                const response: any = await settingsService.deleteStatus('pluspedidos', statusValues[indexRemove].id.toString());
                                if(response.status == 200) {
                                    statusValues.splice(indexRemove, 1);
                                    for (let i = indexRemove; i < statusValues.length; i ++) {
                                        statusValues[i].posicao = statusValues[i].posicao - 1;
                                    }
                                    for(let i = 0; i < statusValues.length; i ++) {
                                        const element: ListItem = statusValues[i];
                                        await settingsService.setStatusPosition('pluspedidos', element);
                                    }
                                    if(alertContent != null) {
                                        alertContent.style.visibility = "visible";
                                        alertContent.style.backgroundColor = 'green';
                                        alertContent.innerHTML = `
                                                <h3>Status deletado com sucesso</h3>
                                            `
                                        location.reload()
                                    }
                                } else {
                                    alertContent.style.visibility = "visible";
                                    alertContent.style.backgroundColor = 'white';
                                    alertContent.style.color = 'black';
                                    alertContent.style.border = '1px solid black';
                                    alertContent.style.flexDirection = 'column';
                                    alertContent.innerHTML = `
                                        <div id="pop-up-content">
                                            <h4>Esse status está em uso, gostaria de inativar ?</h4>
                                        </div>
                                        <div id="pop-up-body">
                                            <button id="finish-delete">Sim</button>
                                            <button id="cancel-delete">Não</button>
                                        </div>
                                    `;
                                    const finishDelete = document.getElementById('finish-delete');
                                    const cancelDelete = document.getElementById('cancel-delete');
                                    
                                    finishDelete?.addEventListener('click', async () => {
                                        alertContent.innerHTML = `
                                            <h3>Inativando status ...</h3>
                                        `
                                        alertContent.style.backgroundColor = 'orange';
                                        alertContent.style.color = 'white';
                                        alertContent.style.border = '0';
                                        
                                        for (let i = indexRemove; i < statusValues.length; i ++) {
                                            statusValues[i].posicao = statusValues[i].posicao - 1;
                                        }
                                        for(let i = 0; i < statusValues.length; i ++) {
                                            const element: ListItem = statusValues[i];
                                            await settingsService.setStatusPosition('pluspedidos', element);
                                        }
                                        await settingsService.setStatusPosition('pluspedidos', {
                                            id: e.id,
                                            nome: e.nome,
                                            posicao: -1,
                                        });
                                        if(alertContent != null) {
                                            alertContent.style.visibility = "visible";
                                            alertContent.style.backgroundColor = 'green';
                                            alertContent.innerHTML = `
                                                    <h3>Status inativado com sucesso</h3>
                                                `
                                            location.reload()
                                        }
                                    })
                                    
                                    cancelDelete?.addEventListener('click', () => {
                                        alertContent.style.visibility = "hidden";
                                    })
                                }
                                
                            })
                            cancelDelete?.addEventListener('click', () => {
                                alertContent.style.visibility = "hidden";
                            })
                        }
                    }
                } catch {
                    const alertContent = document.getElementById('alert-content')
                    if(alertContent != null) {
                        alertContent.style.visibility = "visible";
                        alertContent.style.backgroundColor = 'red';
                        alertContent.innerHTML = `
                                <h3>Erro ao atualizar posições</h3>
                            `
                        setTimeout(() => {
                            alertContent.style.visibility = "hidden";
                        }, 3000);
                    }
                }
                
            })
        })
    }
})

const buttonSubmit = document.getElementById('btn-update-status')
buttonSubmit?.addEventListener('click', async (e) => {
    const settingsService = new SettingsService();
    try {
        const alertContent = document.getElementById('alert-content')
        if(alertContent != null) {
            alertContent.style.visibility = "visible";
            alertContent.style.backgroundColor = 'orange';
            alertContent.innerHTML = `
                    <h3>Enviando atualizações ...</h3>
                `
            // setTimeout(() => {
            //     alertContent.style.visibility = "hidden";
            // }, 3000);
            // location.reload()
        }
        for(let i = 0; i < finalListSubmit.length; i ++) {
            const element: ListItem = finalListSubmit[i];
            await settingsService.setStatusPosition('pluspedidos', element);
        }
        if(alertContent != null) {
            alertContent.style.visibility = "visible";
            alertContent.style.backgroundColor = 'green';
            alertContent.innerHTML = `
                    <h3>Dados atualizados com sucesso</h3>
                `
            await setTimeout(() => {
                alertContent.style.visibility = "hidden";
            }, 3000);
            location.reload()
        }
    } catch {
        const alertContent = document.getElementById('alert-content')
        if(alertContent != null) {
            alertContent.style.visibility = "visible";
            alertContent.style.backgroundColor = 'red';
            alertContent.innerHTML = `
                    <h3>Erro ao atualizar posições</h3>
                `
            setTimeout(() => {
                alertContent.style.visibility = "hidden";
            }, 3000);
        }
    }
    
})

const buttonPostStatus = document.getElementById('btn-post-status');
buttonPostStatus?.addEventListener('click', async (e) => {
    try {
        const alertContent = document.getElementById('alert-content')
        if(alertContent != null) {
            alertContent.style.visibility = "visible";
            alertContent.style.backgroundColor = 'orange';
            alertContent.innerHTML = `<h3>Cadastrando status...</h3>`
        }
        const inputStatus = (document.getElementById('input-novo-status') as HTMLInputElement)?.value
        const indexStatus = initListSubmit.findIndex(e => e.nome.toLowerCase() === inputStatus.toLowerCase().trim())
        if(indexStatus == -1) {
            const settingsService = new SettingsService();
            await settingsService.postStatus('pluspedidos', {nome: inputStatus});
            if(alertContent != null) {
                alertContent.style.visibility = "visible";
                alertContent.style.backgroundColor = 'green';
                alertContent.innerHTML = `
                        <h3>Dados atualizados com sucesso</h3>
                    `
                await setTimeout(() => {
                    alertContent.style.visibility = "hidden";
                }, 3000);
                location.reload()
            }
        } else {
            if(alertContent != null) {
                alertContent.style.visibility = "visible";
                alertContent.style.backgroundColor = 'orange';
                alertContent.innerHTML = `
                        <h3>Esse status já está cadastrado</h3>
                    `
                setTimeout(() => {
                    alertContent.style.visibility = "hidden";
                }, 3000);
            }
        }
    } catch {
        const alertContent = document.getElementById('alert-content')
        if(alertContent != null) {
            alertContent.style.visibility = "visible";
            alertContent.style.backgroundColor = 'red';
            alertContent.innerHTML = `
                    <h3>Erro ao atualizar posições</h3>
                `
            setTimeout(() => {
                alertContent.style.visibility = "hidden";
            }, 3000);
        }
    }
    
})

const statusInactive = document.getElementById('status-trash')
statusInactive?.addEventListener('click', async () => {
    // statusInactive.style.visibility = "hidden";
    const settingsService = new SettingsService();
    const statusResponse: any = await settingsService.getInactiveStatusList('pluspedidos');
    const statusValues: ListItem[] = statusResponse.response
    let labelsStatus: string = '';
    if (statusValues.length > 0) {
        statusValues.map(
            (e: ListItem) => {
                const buttonSaveId = `btn-restore-${e.id}`;
                const labelStatusId = `label-status-${e.id}`;
    
                labelsStatus += `
                <div id="row-status">
                    <h4 id="${labelStatusId}">${e.nome}</h4>
                    <div id="buttons-arrow">
                        <button id="${buttonSaveId}">
                            <img src="../../assets/historia.png" alt="Logo" id="button-restore">
                        </button>
                    </div>
                </div> \n
            `;
        });
    }

    statusInactive.textContent = 'Voltar';
    statusInactive.id = 'back-status';
    const statusField = document.getElementById('setting-status')    

    if (statusField) {
        statusField.innerHTML = labelsStatus;
        if(statusValues.length > 0) {
            statusValues.map((e) => {
                const buttonRestore = document.getElementById(`btn-restore-${e.id}`)
                buttonRestore?.addEventListener('click', () => {
                    const alertContent = document.getElementById('alert-content')
                    if(alertContent != null) {
                        alertContent.style.visibility = "visible";
                        alertContent.style.backgroundColor = 'white';
                        alertContent.style.color = 'black';
                        alertContent.style.border = '1px solid black';
                        alertContent.style.flexDirection = 'column';
                        alertContent.innerHTML = `
                            <div id="pop-up-content">
                                <h4>Gostaria de restaurar esse status ?</h4>
                            </div>
                            <div id="pop-up-body">
                                <button id="finish-delete">Sim</button>
                                <button id="cancel-delete">Não</button>
                            </div>
                        `;
                        const finishDelete = document.getElementById('finish-delete');
                        const cancelDelete = document.getElementById('cancel-delete');
                                                    
                        finishDelete?.addEventListener('click', async () => {
                            alertContent.innerHTML = `
                                <h3>Restaurando status ...</h3>
                            `
                            alertContent.style.backgroundColor = 'orange';
                            alertContent.style.color = 'white';
                            alertContent.style.border = '0';
                            await settingsService.setActiveStatus('pluspedidos', e.id.toString());
                        
                            if(alertContent != null) {
                                alertContent.style.visibility = "visible";
                                alertContent.style.backgroundColor = 'green';
                                alertContent.innerHTML = `
                                    <h3>Status restaurado com sucesso</h3>
                                `
                                location.reload()
                            }
                        })
                                            
                        cancelDelete?.addEventListener('click', () => {
                            alertContent.style.visibility = "hidden";
                        })
                    }
                })
            })
        } else {
            labelsStatus = `
                <div id="alert-empty">
                    <h4>Você não possui status inativos</h4>
                </div>
            `;
            statusField.innerHTML = labelsStatus
        }
    }

    const back = document.getElementById('back-status');
    back?.addEventListener('click', () => {
        location.reload()
    })
})