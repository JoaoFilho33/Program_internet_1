const seletorIMG = document.getElementById("seletorIMG")
const resultado = document.getElementById("resultado")

seletorIMG.addEventListener('change', () => {
    const nomeImg = seletorIMG.value;
    const img = document.createElement("img");
    img.src = "imagens/" + nomeImg;
    resultado.innerHTML = '';
    resultado.appendChild(img);
})