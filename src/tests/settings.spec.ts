import { SettingsService } from '../services/settings_service'

describe('SettingsServices', () => {
    it('should return status', async () => {
        const settingsService = new SettingsService()
        const result: any = await settingsService.getStatusList('pluspedidos');
        expect(result.status).toEqual(200)
    })
    it('should set positions with status', async () => {
        const settingsService = new SettingsService();
        const request = {
            id: 1,
            nome: 'Teste',
            posicao: 0
        };
        const result: any = await settingsService.setStatusPosition('pluspedidos', request);
        expect(result.status).toEqual(200)
    })

    it('should post positions with status', async () => {
        const settingsService = new SettingsService();
        const request = {
            nome: 'Test'
        };
        const result: any = await settingsService.postStatus('pluspedidos', request);
        expect(result.status).toEqual(201)
    })
})