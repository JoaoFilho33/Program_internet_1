const textBox = document.getElementById("textBox")
const select = document.getElementById("select")
const botaoInserir = document.getElementById("botaoInserir")

botaoInserir.addEventListener('click', () => {
    const texto = textBox.value.trim()

    if( texto == '') {
        alert('Texto inválido!')
        return
    }

    if(select.options.length >= 5) {
        alert("Você chegou no limite")
        return
    }
    
    for(let i = 0; i < select.options.length; i++) {
        if(select.options[i].value == texto) {
            alert('O texto já existe!')
            return
        }
    }

    const option = document.createElement('option')
    option.text = texto

    select.appendChild(option)
})