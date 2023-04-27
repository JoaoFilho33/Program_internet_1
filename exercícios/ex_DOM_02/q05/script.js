function validarCheckbox() {
    const opcoes = document.getElementsByName("opcao")
    let eh_checado = false

    for(let i = 0; i < opcoes.length; i++) {
        if(opcoes[i].checked) {
            eh_checado = true
            break
        }
    }

    if(eh_checado) {
        alert("Pelo menos um checkbox foi marcado!")
    }
    else {
        alert("Nenhum checkbox foi marcado!")
    }
}