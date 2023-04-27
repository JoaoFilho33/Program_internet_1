const botaoVisu = document.getElementById('botaoVisu')
const resultado = document.getElementById('resultado')

botaoVisu.addEventListener('click', function() {
    const nomeImg = document.getElementById('campoIMG').value;
    const img = document.createElement("img");
    img.src = "imagens/" + nomeImg
    resultado.appendChild(img);
})