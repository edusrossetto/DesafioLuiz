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