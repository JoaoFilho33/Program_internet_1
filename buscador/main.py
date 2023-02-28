import requests 
from bs4 import BeautifulSoup

#res =  requests.get('http://www.ifpi.edu.br/')

#url = input("Infome uma url: ")
#res = requests.get(url)
res = requests.get('http://127.0.0.1:5500/html/main.html')
soup = BeautifulSoup(res.content, 'html.parser')
text = soup.get_text()

key = "dragão"

def busca_termo(key, text):
    array = []

    for i in range(len(text)):
        if text[i:i+len(key)] == key:
            inicio = max(0, i - 15)
            fim = min(len(text), i+len(key) + 15)
            contexto = text[inicio:fim]
            array.append(contexto)

    return array

print(busca_termo(key))

def obter_texto(url):
    res = requests.get(url)
    soup = BeautifulSoup(res.content, 'html.parser')
    text = soup.get_text()

    return text

def search(key, url, depth):
    text = obter_texto(url)
    array_text = []

    if depth > 0:
        for link in soup.find_all("a"):
            href = link.get('href')
            #links.append(href)
            array_text.append(obter_texto(href))
            busca_termo(key, array_text[link])
    else:
        busca_termo(key, text)
        
    #preciso buscar os links da página 0 + links de cada página até chegar no depth escolhido
    #cuidado com requisições de paginas identicas

