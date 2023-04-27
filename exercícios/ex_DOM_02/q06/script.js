const botaoConverter = document.getElementById('botaoConverter')
const resultado = document.getElementById('resultado')

botaoConverter.addEventListener('click', function() {
    const opcao = document.getElementById('opcao').value
    const texto = document.getElementById('textBox').value
    const textoConvertido = converterTexto(texto, opcao)
    resultado.innerHTML = textoConvertido
})

function converterTexto(texto, opcao) {
    if(opcao === 'maiusculo') {
        return texto.toUpperCase()
    } else if(opcao === 'minusculo') {
        return texto.toLowerCase()
    } else {
        return texto
    }
}