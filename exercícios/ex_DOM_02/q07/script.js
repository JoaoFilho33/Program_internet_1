const textBox = document.getElementById("textBox")
const select = document.getElementById("select")
const botaoInserir = document.getElementById("botaoInserir")

botaoInserir.addEventListener('click', () => {
    const texto = textBox.value

    const option = document.createElement('option')
    option.text = texto
    select.appendChild(option)
})