function showAlert(type, text) {
    
    var alertPlaceholder = document.getElementById("alertPlaceholder")
    var wrapper = document.createElement('div')
    
    wrapper.innerHTML = 
    '<div class="alert alert-' + type + ' alert-dismissible" role="alert">'
    + text + 
      '<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>'
  
    alertPlaceholder.append(wrapper)

    setTimeout(function(){
        alertPlaceholder.removeChild(wrapper)

    },1500)
    
}
function alertDelet(){
    showAlert("success", `Aluno deletado`);
}