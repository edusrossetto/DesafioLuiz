var alunoFields = {
    name: document.getElementById("nameNewAluno"),
    phone: document.getElementById("telefoneNewAluno"),
    lastName: document.getElementById("lastNameNewAluno"),
    email: document.getElementById("emailNewAluno")
}

function getCampos() {
    return {
        first_name: alunoFields.name.value,
        phone: alunoFields.phone.value,
        last_name: alunoFields.lastName.value,
        email: alunoFields.email.value}
}

function clearCampos() {
    alunoFields.name.value = ""
    alunoFields.phone.value = ""
    alunoFields.lastName.value = ""
    alunoFields.email.value = ""
}
function setCampos(aluno) {
    console.log(aluno)
    alunoFields.name.value = aluno.first_name
    alunoFields.phone.value = aluno.phone
    alunoFields.lastName.value = aluno.last_name
    alunoFields.email.value = aluno.email
}

function clickLimpar() {
    var botao = document.getElementById('criarAlunoBtn')
    botao.classList.remove("invisivel")
    console.log('limpa')
    clearCampos()
    let limparBtn = document.getElementById("limpar")
    limparBtn.hidden = true
    exemplo(false, function() {
        console.log("teste")
    })
}