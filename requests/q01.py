import requests 
from bs4 import BeautifulSoup

res = requests.get("https://www.cifraclub.com.br/estilos/rock/")

soup = BeautifulSoup(res.text, 'html.parser')


links = []
for link in soup.find_all("a"):
    href = link.get('href')
    if href and href.startswith("https"):# ele verifica se é iniciado com "https", se sim será adicionado ao vetor links
        links.append(href)

for url in links:
    print(url)