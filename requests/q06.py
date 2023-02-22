import requests
from bs4 import BeautifulSoup
from tabulate import tabulate

url = input("Url: ")
res = requests.get(url)

soup = BeautifulSoup(res.content, 'html.parser')
table = soup.find('table')

linhas = table.find_all("tr")

lista = []
for linha in linhas:
    celulas = linha.find_all(["th", "td"])
    info_linha = [celula.get_text().strip() # strip() tira os espaços no início e no final da string
                    for celula in celulas] 

    lista.append(info_linha)

tabela_colunas = lista[0]
tabela_linhas = lista[1:]

print(tabulate(tabela_linhas, headers=tabela_colunas))