import requests
from bs4 import BeautifulSoup

url = input("Informe uma página: ")
termo = input("E informe também um termo a ser buscado nessa página: ")

res = requests.get(url)
soup = BeautifulSoup(res.content, 'html.parser')

text = soup.get_text()

for i in range(len(text)):
    if text[i:i+len(termo)] == termo:
        inicio = max(0, i - 20)
        fim = min(len(text), i + len(termo) + 20)
        contexto = text[inicio:fim]
        print(contexto)