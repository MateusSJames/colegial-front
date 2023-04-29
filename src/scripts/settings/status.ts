import { SettingsService } from '../../services/settings_service'

//FALTA DEIXAR DINAMICO A BASE DO FORNECEDOR
document.addEventListener('DOMContentLoaded', async () => {
    const settingsService = new SettingsService();
    const statusResponse: any = await settingsService.getStatusList('pluspedidos');
    const statusValues = statusResponse.response
    let labelsStatus: string = '';

    statusValues.map((e: any) => labelsStatus += `<h2>${e.nome}</h2> \n`)
    const statusField = document.getElementById('setting-status')    

    if (statusField) {
        statusField.innerHTML = labelsStatus;
    }

})