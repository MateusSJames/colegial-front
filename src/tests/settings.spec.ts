import { SettingsService} from '../services/settings_service'

describe('SettingsServices', () => {
    it('should return status', async() => {
        const settingsService = new SettingsService()
        const result: any = await settingsService.getStatusList('pluspedidos');
        expect(result.status).toEqual(200)
    })
})