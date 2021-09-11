
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
    
    wrapper.innerHTML = '<div class="alert alert-'
     + type + 
     ' alert-dismissible" role="alert">'
    + text + 
      '<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>'
  
    alertPlaceholder.append(wrapper)

    setTimeout(function(){
         alertPlaceholder.removeChild(wrapper)

    },1500);
}


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
    }
}

function updateAlunosList() {
    let list = document.getElementById("items")
    var alunoEntries = ""
    self.alunos.forEach(aluno => {
        alunoEntries += `<tr>
        <td>${aluno.first_name}</td>
        <td>${aluno.last_name}</td>
        <td>${aluno.email}</td>
        <td>${aluno.phone}</td>
        <a href="http://allisondskinner.com">
        <td><button class="btn" onClick="editAluno(${aluno.id})">Editar</button></td>
        <td><button class="btn" onClick="apagaAluno(${aluno.id})">Apagar</button></td>
        <td><button class="btn" onClick="alertaAluno(${aluno.id})">Alerta!</button></td>
        </a>
        </tr>`
    });

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
    if(valida(alunoFields)== true){
    let infoNewAluno = getCampos()
    infoNewAluno.id = getRandomInt(1,100000)
    clearCampos()
    createNewAluno(infoNewAluno)
    updateAlunosList()}
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
  }

function hasNumber(myString) {
    return /\d/.test(myString);
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

function clickLimpar() {
    console.log('limpa')
    clearCampos()
    let limparBtn = document.getElementById("limpar")
    limparBtn.hidden = true
    exemplo(false, function() {
        console.log("teste")
    })
}
function validateEmail(email) {
        var re = /\S+@\S+\.\S+/;
        return re.test(email);
    }
function validatePhone(phone) {
        var rex = /^\([1-9]{2}\) (?:[2-8]|9[1-9])[0-9]{3}\-[0-9]{4}$/;
        return rex.test(phone);
    }

    

    


function valida(alunoFields){
    var nomev = alunoFields.name.value
    var sobrev = alunoFields.lastName.value
    var emailv = alunoFields.email.value
    var telv = alunoFields.phone.value

    if (nomev == '' || hasNumber(nomev) || String(nomev).length>16 || String(nomev).length<2){
        showAlert('warning', "Nome inválido")
        
        return false;
    } else if(sobrev == '' || hasNumber(sobrev) || String(sobrev).length>16 || String(sobrev).length<2){
        showAlert('warning', "Sobrenome inválido")

    } else if(!validateEmail(emailv)){
        
        showAlert('warning', "Email inválido")

    }else if(!validatePhone(telv)){
        showAlert('warning', "Telefone inválido")

    }
    else{
        console.log(emailv)
        return true}

}




document.addEventListener("DOMContentLoaded", function() {
    updateAlunosList(self.alunos)
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
}
);