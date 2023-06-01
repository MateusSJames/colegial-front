import { HomeService } from '../services/home_service'

interface DisciplinaDto {
    id: number,
    codigo: number,
    nome: string
}

interface StudentDto {
    codigo: number,
	nome: string,
	email: string,
	idade: number
}

interface GradeDto {
    nome: string,
    nota: number
}

interface StudentGradeDto {
    id_aluno: number,
    id_materia: number,
    nota: number
}

const disciplinas: DisciplinaDto[] = [
    {
        id: 1,
        codigo: 1,
        nome: 'Docker'
    },
    {
        id: 2,
        codigo: 2,
        nome: 'Inglês'
    },
    {
        id: 3,
        codigo: 3,
        nome: 'Golang'
    },
    {
        id: 4,
        codigo: 4,
        nome: 'Cálculo'
    },
    {
        id: 5,
        codigo: 5,
        nome: 'Design'
    }
];

const buttonCadastro = document.getElementById('cadastros')
const buttonAluno = document.getElementById('alunos')

buttonCadastro?.addEventListener('click', () => {
    location.href = 'home.html'
})

buttonAluno?.addEventListener('click', () => {
    location.href = 'aluno.html'
})

const buttonSearch = document.getElementById('btn-search')

const homeService = new HomeService()
const codeInput = document.getElementById('code') as HTMLInputElement

buttonSearch?.addEventListener('click', async () => {
    const studentResponse: any = await homeService.getStudentByCode(codeInput.value)
    const student: StudentDto = studentResponse.response
    const contentPage = document.getElementById('content-page')

    if(contentPage) {
        contentPage.innerHTML = `
            <div id="header-boletim">
                <h3>Boletim</h3>
            </div>
        `
        if(student) {
            contentPage.innerHTML += `
                <div id="header-student">
                    <h4>Aluno: ${student.nome}</h4>
                    <h4>Email: ${student.email}</h4>
                    <h4>Idade: ${student.idade}</h4>
                </div>
                <div id="header-grade"></div>
            `;
        } else {
            contentPage.innerHTML += `
                <div id="header-student">
                    <h4>Aluno não encontrado</h4>
                </div>
                <div id="header-grade"></div>
            `;
        }
        
    }

    const contentGrade = document.getElementById("header-grade")
    const gradesResponse: any = await homeService.getStudentByGrade(codeInput.value)
    const listGrades: GradeDto[] = gradesResponse.response

    if(contentGrade && student) {
        disciplinas.map(e => {
            contentGrade.innerHTML += `
                <div id= "disciplina-${e.id}">
                    <h4>${e.nome}</h4>
                </div>
            `;
        })
    }

    if(listGrades == null) {
        for(let i = 0; i < disciplinas.length; i ++) {
            const disciplinaGrade = document.getElementById(`disciplina-${disciplinas[i].id}`)
            
            if(disciplinaGrade) {
                disciplinaGrade.innerHTML += `
                        <input id="grade-${disciplinas[i].id}" type="text" value="0.0">`    
            }
            
        }
    } else {
        for(let i = 0; i < disciplinas.length; i ++) {
            const disciplinaGrade = document.getElementById(`disciplina-${disciplinas[i].id}`)
            
            if(disciplinaGrade) {
                disciplinaGrade.innerHTML += `
                        <input id="grade-${disciplinas[i].id}" type="text" value="${listGrades[i].nota}">`
            }
            
        }
    }

    if(contentPage && student) {
        contentPage.innerHTML += `
            <div id="section-btn">
                <button id="btn-boletim">Finalizar boletim</button>
            </div>
        `
    }

    if(listGrades != null) {
        const buttonBoletim = document.getElementById('btn-boletim');
        if(buttonBoletim) {
            buttonBoletim.style.visibility = "hidden";
        }
    }

    const buttonFinish = document.getElementById('btn-boletim')

    buttonFinish?.addEventListener('click', async () => {
        for(let i = 0; i < disciplinas.length; i ++) {
            const grade = document.getElementById(`grade-${disciplinas[i].id}`) as HTMLInputElement
            
            if(grade) {
                const gradeStudent: StudentGradeDto = {
                    id_aluno: student.codigo,
                    id_materia: disciplinas[i].id,
                    nota: Number.parseFloat(grade.value)
                }
                await homeService.saveGradesStudent(gradeStudent)
            }
        }
        alert('NOTAS SUBMETIDAS COM SUCESSO')
    })
})