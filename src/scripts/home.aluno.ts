import { HomeService } from '../services/home_service'

interface StudentDto {
    codigo: number,
	nome: string,
	email: string,
	idade: number
}

const buttonBoletim = document.getElementById('boletim')
const buttonCadastro = document.getElementById('cadastros')

buttonBoletim?.addEventListener('click', () => {
    location.href = 'boletim.html'
})

buttonCadastro?.addEventListener('click', () => {
    location.href = 'home.html'
})

document.addEventListener('DOMContentLoaded', async () => {
    const homeService = new HomeService()
    const homeResponse:any = await homeService.getStudents()
    const students: StudentDto[] = homeResponse.response

    const contentPage = document.getElementById('content-page')

    if(contentPage) {
        contentPage.innerHTML += `
            <table id="table-students">
                <tr>
                    <th>Código</th>
                    <th>Nome</th>
                    <th>Email</th>
                    <th>Idade</th>
                </tr>
            </table>`
        const tableStudent = document.getElementById('table-students')
        if(tableStudent) {
            students.map(e => {
                tableStudent.innerHTML += `
                    <tr>
                        <th>${e.codigo}</th>
                        <th>${e.nome}</th>
                        <th>${e.email}</th>
                        <th>${e.idade}</th>
                    </tr>`
            })
        }
    }
})