const select1 = document.getElementById('select1');
const select2 = document.getElementById('select2');
const botaoTransferirDireita = document.getElementById('botaoTransferirDireita');
const botaoTransferirEsquerda = document.getElementById('botaoTransferirEsquerda');

botaoTransferirDireita.addEventListener('click', () => {
  for (let i = 0; i < select1.options.length; i++) {
    if (select1.options[i].selected) {
      const newOption = document.createElement('option');
      newOption.value = select1.options[i].value;
      newOption.text = select1.options[i].text;
      select2.appendChild(newOption);
      select1.remove(i);
      i--;
    }
  }
});

botaoTransferirEsquerda.addEventListener('click', () => {
  for (let i = 0; i < select2.options.length; i++) {
    if (select2.options[i].selected) {
      const newOption = document.createElement('option');
      newOption.value = select2.options[i].value;
      newOption.text = select2.options[i].text;
      select1.appendChild(newOption);
      select2.remove(i);
      i--;
    }
  }
});
