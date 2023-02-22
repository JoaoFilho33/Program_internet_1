import urllib.request

url = "https://pop.proddigital.com.br/wp-content/uploads/sites/8/2023/01/anime-inuyasha-divulgacao-1024x683.jpg"
arquivo = "inuyasha.jpg"

urllib.request.urlretrieve(url, arquivo)

#a função "urlretrieve" baixa o conteúdo do link e salva com o nome especificado na variável "arquivo"