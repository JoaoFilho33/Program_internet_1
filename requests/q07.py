import requests

cep = input("Informe um CEP sem espaços: ")

url = f"https://viacep.com.br/ws/{cep}/json/"

res = requests.get(url)

if res.status_code == 200:
    data = res.json()
    cep = data['cep']
    logradouro = data['logradouro']
    bairro = data['bairro']
    cidade = data['localidade']
    uf = data['uf']

    print(f" CEP: {cep} \n Cidade: {cidade}-{uf} \n Logradouro: {logradouro} \n Bairro: {bairro}")
else:
    print("ERRO")
    print("Verifique o cep informado")