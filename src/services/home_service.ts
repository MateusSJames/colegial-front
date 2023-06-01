import axios from 'axios';

interface StudentPayload {
    codigo: number,
	nome: string,
	email: string,
	idade: number
}

interface StudentGradePayload {
    id_aluno: number,
    id_materia: number,
    nota: number
}

class HomeService implements IHomeScript{
    async getStudents<T>(): Promise<T> {
        try {
            const statusRequest = await axios.get(`http://localhost:3000/students`);
            const statusResponse = {status: statusRequest.status, response: statusRequest.data} as T;
            return statusResponse;
        } catch (error: any) {
            return {status: error.response.status, message: error.response.statusText} as T;
        }
    }

    async saveGradesStudent<T>(grade: StudentGradePayload): Promise<T> {
        try {
            const postRequest = await axios.post(`http://localhost:3000/grade/create`, grade);
            return {status: postRequest.status, message: postRequest.data} as T;
        } catch (error: any) {
            console.log(error)
            return {status: error.response.status, message: error.response.statusText} as T;
        }
    }

    async getStudentByGrade<T>(code: T): Promise<T> {
        try {
            const statusRequest = await axios.get(`http://localhost:3000/grades/${code}`);
            const statusResponse = {status: statusRequest.status, response: statusRequest.data} as T;
            return statusResponse;
        } catch (error: any) {
            return {status: error.response.status, message: error.response.statusText} as T;
        }
    }

    async getStudentByCode<T>(code: T): Promise<T> {
        try {
            const statusRequest = await axios.get(`http://localhost:3000/students/${code}`);
            const statusResponse = {status: statusRequest.status, response: statusRequest.data} as T;
            return statusResponse;
        } catch (error: any) {
            return {status: error.response.status, message: error.response.statusText} as T;
        }
    }

    async createStudent<T>(student: StudentPayload): Promise<T> {
        try {
            const postRequest = await axios.post(`http://localhost:3000/students/create`, student);
            return {status: postRequest.status, message: postRequest.data} as T;
        } catch (error: any) {
            console.log(error)
            return {status: error.response.status, message: error.response.statusText} as T;
        }
    }
}

export { HomeService }