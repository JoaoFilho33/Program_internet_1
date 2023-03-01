import requests 
import requests_cache
from bs4 import BeautifulSoup
import logging
from urllib.parse import urljoin

#res =  requests.get('http://www.ifpi.edu.br/')

#url = input("Infome uma url: ")
#res = requests.get(url)
"""
res = requests.get('http://127.0.0.1:5500/html/main.html')
soup = BeautifulSoup(res.content, 'html.parser')
text = soup.get_text()
"""

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

# print(busca_termo(key))

def obter_texto(url):
    res = requests.get(url)
    soup = BeautifulSoup(res.content, 'html.parser')
    text = soup.get_text()

    return text


def solicitacao_http(url):
    return requests.get(url)

def obter_html(url):
    res = requests.get(url)
    return BeautifulSoup(res.content, "html.parser")

"""
def buscar_links(url):
    soup = obter_html(url)
    links = soup.find_all("a")

    for link in links:
            href = link.get('href')
            if href.startswith('http'):
                buscar_links(href)
            else:
                base_url = requests.get(url).url
                absolute_url = 
"""


def eh_link_externo_nao_visitado(href, urls_visitadas):
    if href and href.startswith('http') and href not in urls_visitadas:
        return True

class localizador_de_links:
    def __init__(self, start_url, max_depth=3):
        self.visited_urls = set() # guarda as urls visitadas
        self.start_url = start_url
        self.max_depth = max_depth
        self.session = None

    def get_links(self, url):
        session = self.get_session()
        res = session.get(url)
        soup = BeautifulSoup(res.content, 'html.parser')
        #links = soup.find_all("a")

        links = []
        for link in soup.find_all("a"):
            href = link.get('href')

            if href is not None:
                absolute_url = self.absolute_url(href, res.url)
                if absolute_url not in self.visited_urls:
                    links.append(absolute_url)

        return links

    def get_session(self): # faz com que armazene em cache as páginas da web que foram acessadas anteriormente 
        if not self.session:
            requests_cache.install_cache('cache')
            self.session = requests_cache.CachedSession() # ao obter a sessão http, todas as solicit. subseq. se está armazenada em cache
        return self.session

    def absolute_url(self, url, base_url):
        return urljoin(base_url, url)

    """
    def absolute_url(self, url):
        session = self.get_session()
        res = session.get(url)
        soup = BeautifulSoup(res.content, 'html.parser')
        array_links = []

        for link in soup.find_all("a"): # encontrar as tags <a>
            href = link.get('href')
            if href is not None:
                absolute_url = self.absolute_url(href, res.url) # criate url absoluta
                if absolute_url not in self.visited_urls:
                    array_links.append(absolute_url)
        return array_links
    """

    def search(self, url=None, depth=0):
        if not url:
            url = self.start_url
        if depth > self.max_depth:
            return [] # se atingir o depth max return lista vazia
        links = self.get_links(url)
        self.visited_urls.add(url) # added url atual as visitadas

        results = []
        for link in links:
            if link not in self.visited_urls:
                results.append(link)
                results.extend(self.search(link, depth+1))

        return results
        

    """
    def buscar_links(self, url, max_depth=0, depth=0):
        array_links = []
        self.visited_urls.add(url)
        res = requests.get(url)
        soup = BeautifulSoup(res.content, 'html.parser')

        links = soup.find_all("a", href==True)

        if res.status_code==200:
            text = soup.get_text()

            for link in links:
                href = link.get('href')

                if eh_link_externo_nao_visitado(href, self.visited_urls):
                    array_links.append(href)
                    self.buscar_links(href)

                elif href: # trata links relativos
                    absolute_url = f'{res.url.rstrip("/")}/{href.lstrip("/")}' # rstrip remove caracteres

                    if absolute_url not in self.visited_urls:
                        array_links.append(href)
                        self.buscar_links(absolute_url)
        
                
                    if depth < max_depth:
                        array_links.extend(buscar_links())

        return array_links
        """

url = "http://127.0.0.1:5500/buscador/html/main.html"
findLinks = localizador_de_links(url, max_depth=2)
results = findLinks.search()
print(len(results))
for link in results:
    print(link)

"""
def search(key, url, depth):
    busca = localizador_de_links(url)

    text = obter_texto(url)
    soup = obter_html(url)
    array_text = []
    links = soup.find_all("a") # pega todos os links da página

    if depth > 0:
        
        for link in links:
            href = link.get('href')
            if href.startswith('http'):
                array_text.append(obter_texto(href))
                
                busca_termo(key, array_text[link])
        
        for i in busca:
            busca.buscar_links(url)
    else:
        busca_termo(key, text)
"""
    #preciso buscar os links da página 0 + links de cada página até chegar no depth escolhido
    #cuidado com requisições de paginas identicas



