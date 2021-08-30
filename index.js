
var alunos = []

var editedAlunoId = 0

var alunoFields = {
    name: document.getElementById("nameNewAluno"),
    phone: document.getElementById("telefoneNewAluno"),
    lastName: document.getElementById("lastNameNewAluno"),
    email: document.getElementById("emailNewAluno")
}

let endpointURL = "http://172.16.48.54:5000/api/alunos"

function showAlert(type, text) {
    var alertPlaceholder = document.getElementById("alertPlaceholder")
    var wrapper = document.createElement('div')
    wrapper.innerHTML = '<div class="alert alert-' + type + ' alert-dismissible" role="alert">' + text + '<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>'
  
    alertPlaceholder.append(wrapper)
}

function getAlunosFromService() {
    axios.get(endpointURL)
    .then(response => {
        alunos = response.data
        updateAlunosList(self.alunos)
    })
    .catch(err => {
        showAlert("danger", err)
    })
    console.log("teste")
}

function createNewAluno(data) {
    axios.post(endpointURL, data)
    .then(response => {
        showAlert("success", `Aluno adicionado com sucesso`)
        getAlunosFromService()
    })
    .catch(err => {
        showAlert("danger", err)
    })
}

function updateAluno(data) {
    axios.put(`${endpointURL}/${self.editedAlunoId}`, data)
    .then(response => {
        console.log(response)
        showAlert("success", `Aluno editado com sucesso`)
        getAlunosFromService()
    })
    .catch(err => {
        showAlert("danger", err)
    })
}

function updateAlunosList(alunos) {
    let list = document.getElementById("items")
    var alunoEntries = ""
    alunos.forEach(aluno => {
        alunoEntries += `<tr><td>${aluno.first_name}</td><td>${aluno.last_name}</td><td>${aluno.email}</td><td>${aluno.phone}</td><td><button class="btn" onClick="editAluno(${aluno.id})">Editar</button></td><td><button onClick="apagaAluno(${aluno.id})">Apagar</button></td><td><button onClick="alertaAluno(${aluno.id})">Alerta!</button></td></tr>`
    });

    list.innerHTML = alunoEntries
}

function alertaAluno(alunoId) {
    console.log(alunoId)
    let alunoFiltrados = alunos.filter(aluno => aluno.id == alunoId)
    let aluno = alunoFiltrados[0]
    alert(`${aluno.first_name} ${aluno.last_name}`);
}

function apagaAluno(idAluno) {

    var resultado = axios.delete(`${endpointURL}/${idAluno}`)

    resultado.then(response => {
        console.log(response)
        if(response.data.error) {
            showAlert("warning", "Deu xablau")
        } else {
            console.log(response)
            showAlert("success", response.data.message)
            getAlunosFromService()
        
        }
    })
    
}

function editAluno(idAluno) {
    let limparBtn = document.getElementById("limpar")
    limparBtn.hidden = false
    self.editedAlunoId = idAluno
    let aluno = alunos.filter(aluno => aluno.id == idAluno)[0]
    setCampos(aluno)
}

function setCampos(aluno) {
    console.log(aluno)
    alunoFields.name.value = aluno.first_name
    alunoFields.phone.value = aluno.phone
    alunoFields.lastName.value = aluno.last_name
    alunoFields.email.value = aluno.email
}

function getCampos() {
    return {first_name: alunoFields.name.value, phone: alunoFields.phone.value, last_name: alunoFields.lastName.value, email: alunoFields.email.value}
}

function clearCampos() {
    alunoFields.name.value = ""
    alunoFields.phone.value = ""
    alunoFields.lastName.value = ""
    alunoFields.email.value = ""
}

function addAluno() {
    let infoNewAluno = getCampos()
    clearCampos()
    createNewAluno(infoNewAluno)
}

function submitAlunoEdit() {
    var editedAluno = getCampos()
    updateAluno(editedAluno)
    clearCampos()

}

function exemplo(cond, callback) {
    if(cond){ 
        callback()
    }
}

function clickLimpar() {
    console.log('limpa')
    clearCampos()
    let limparBtn = document.getElementById("limpar")
    limparBtn.hidden = true
    exemplo(false, function() {
        console.log("teste")
    })
}



document.addEventListener("DOMContentLoaded", function() {

    getAlunosFromService()
    let createButton = document.getElementById("criarAlunoBtn")
    createButton.addEventListener('click', () => {
        addAluno()
    })

    let editButton = document.getElementById("editarAlunoBtn")
    let limparBtn = document.getElementById("limpar")
    limparBtn.hidden = true
    limparBtn.addEventListener('click', clickLimpar)
    editButton.addEventListener('click', () => {
        if(self.editedAlunoId == 0) {
            showAlert('warning', "Favor selecionar um aluno")
        } else {
            limparBtn.hidden = true
            submitAlunoEdit()
        }
    })
});