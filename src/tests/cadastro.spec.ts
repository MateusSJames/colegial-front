import { CadastroService } from "../services/cadastros_service";

describe('Subscribe', () => {
    it('should return table values', async () => {
        const subscribeService = new CadastroService();
        const response: any = await subscribeService.getTableValues('pluspedidos', 'cli_for', '1');
        expect(response.status).toEqual(200);
    })
})