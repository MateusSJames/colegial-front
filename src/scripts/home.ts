import { HomeService } from '../services/home_service'

interface StudentDto {
    codigo: number,
	nome: string,
	email: string,
	idade: number
}

const buttonSalvar = document.getElementById('btn-cadastro')
const buttonBoletim = document.getElementById('boletim')
const buttonAluno = document.getElementById('alunos')

buttonBoletim?.addEventListener('click', () => {
    location.href = 'boletim.html'
})

buttonAluno?.addEventListener('click', () => {
    location.href = 'aluno.html'
})

buttonSalvar?.addEventListener('click', async () => {
    const inputCode = document.getElementById('code-input') as HTMLInputElement
    const inputName = document.getElementById('nome-input') as HTMLInputElement
    const inputIdade = document.getElementById('idade-input') as HTMLInputElement
    const inputEmail = document.getElementById('email-input') as HTMLInputElement

    const homeService = new HomeService();
    
    if(inputName && inputIdade && inputEmail) {
        const student: StudentDto = {
            codigo: Number.parseInt(inputCode.value),
            nome: inputName.value,
            email: inputEmail.value,
            idade: Number.parseInt(inputIdade.value) 
        }
        const requestStudent:any = await homeService.createStudent(student);
        console.log(requestStudent)
        if(requestStudent.status == 201) {
            alert('ESTUDANTE CADASTRADO COM SUCESSO')
        } 
    }
})