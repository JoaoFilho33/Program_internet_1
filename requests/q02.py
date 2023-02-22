import requests 
from bs4 import BeautifulSoup

res = requests.get("https://www.cifraclub.com.br/estilos/rock/")

soup = BeautifulSoup(res.text, 'html.parser')

tag = input("Insira a tag desejada: ")

for p in soup.find_all(tag):
    print(p)