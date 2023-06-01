import request from 'supertest'
import {HomeService} from '../services/home_service'

describe('Home', () => {
    
    it('should return students', async () => {
        const homeService = new HomeService();
        const response: any = await homeService.getStudents()
        expect(response.status).toEqual(200);
    })
    
    it('should return student by code', async () => {
        const homeService = new HomeService();
        const response: any = await homeService.getStudentByCode(1453)
        expect(response.status).toEqual(200);
    })

    it('should return grades by student', async () => {
        const homeService = new HomeService();
        const response: any = await homeService.getStudentByGrade(1)
        expect(response.status).toEqual(200);
    })
    it('should create student', async () => {
        const homeService = new HomeService();
        const student = {
            codigo: 5,
            nome: "Augusto",
            email: "augusto@gmail.com",
            idade: 13
        }
        const response: any = await homeService.createStudent(student)
        expect(response.status).toEqual(201);
    })
    it('should submit grades for student', async () => {
        const settingsService = new HomeService();
        const grade = {
            id_aluno: 5,
            id_materia: 1,
            nota: 7.2
        }
        const result: any = await settingsService.saveGradesStudent(grade);
        expect(result.status).toEqual(201)
    })
})