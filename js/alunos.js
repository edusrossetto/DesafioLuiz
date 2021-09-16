
var alunos = []

var editedAlunoId = 0

let endpointURL = "http://172.16.48.54:5000/api/alunos"


function createNewAluno(data) {
    self.alunos.push(data)
    showAlert("success", `Aluno adicionado com sucesso`)
}

function updateAluno(data) {
    if(valida(alunoFields)){
    apagaAluno(data.id)
    self.alunos.push(data)
    showAlert("success", `Aluno alterado com sucesso`)
    updateAlunosList()
    }else{
        editAluno(idAluno)
    }
}

function updateAlunosList() {
    var botao = document.getElementById('criarAlunoBtn')
    botao.classList.remove("invisivel")
    let list = document.getElementById("items")
    var alunoEntries = ""
    self.alunos.forEach(aluno => {
        alunoEntries += `<hr>
        <tr class="elementosx">
        <td>${aluno.first_name}</td>
        <td>${aluno.last_name}</td>
        <td>${aluno.email}</td>
        <td class="phones">${aluno.phone}</td>
        <td><button class="btnf" onClick="editAluno(${aluno.id})">Editar</button>
        <button class="btnf" onClick="apagaAluno(${aluno.id})">Apagar</button>
        <button class="btnf" onClick="alertaAluno(${aluno.id})">Alerta!</button></td>
        
        </tr>
        
        `
    });
    if (alunos==0){
        let container2 = document.getElementById("AlunosRegistrados")
        container2.classList.remove("extended")
    }

    list.innerHTML = alunoEntries
}



function alertaAluno(alunoId) {
    console.log(alunoId)
    let alunoFiltrados = alunos.filter(aluno => aluno.id == alunoId)
    let aluno = alunoFiltrados[0]
    alert(`${aluno.first_name} ${aluno.last_name}`)
    showAlert("warning", `União Flasco`);
}

function apagaAluno(idAluno) {
    var newAlunos = self.alunos.filter(aluno => aluno.id != idAluno)
    self.alunos = newAlunos
    updateAlunosList()
}

function editAluno(idAluno) {
    var botao = document.getElementById('criarAlunoBtn')
    botao.classList.add("invisivel")
 
    // let limparBtn = document.getElementById("limpar")
    // limparBtn.hidden = false
    self.editedAlunoId = idAluno
    let aluno = alunos.filter(aluno => aluno.id == idAluno)[0]
    setCampos(aluno)

}


function addAluno() {
    if(valida(alunoFields)){
    container2 = document.getElementById("AlunosRegistrados")
    let infoNewAluno = getCampos()
    infoNewAluno.id = getRandomInt(1,100000)
    clearCampos()
    container2.classList.add("extended")
    createNewAluno(infoNewAluno)
    updateAlunosList()}
}

function submitAlunoEdit() {
    var editedAluno = getCampos()
    editedAluno.id = self.editedAlunoId
    updateAluno(editedAluno)
    clearCampos()

}


function exemplo(cond, callback) {
    if(cond){ 
        callback()
    }
}



document.addEventListener("DOMContentLoaded", function() {
    updateAlunosList(self.alunos)
    let createButton = document.getElementById("criarAlunoBtn")
    
    createButton.addEventListener('click', () => {  
        addAluno()
    })

    let editButton = document.getElementById("editarAlunoBtn")

    // let limparBtn = document.getElementById("limpar")
    // limparBtn.hidden = true
    // limparBtn.addEventListener('click', clickLimpar)
    
    editButton.addEventListener('click', () => {
        if(self.editedAlunoId == 0) {
            showAlert('warning', "Favor selecionar um aluno")
        } else {
            // limparBtn.hidden = true
            submitAlunoEdit()
        }
    })

}
);