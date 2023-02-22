import requests
from bs4 import BeautifulSoup

url_google = "http://www.google.com/search"
query = input("Search: ")

params = {"q": query}
res = requests.get(url_google, params=params)

soup = BeautifulSoup(res.text, "html.parser")

results_search = soup.find_all("a")

links=[]
count=0
for result in results_search:
    url_google = result.get('href')
    if url_google and url_google.startswith("/url?q="):
        links.append(url_google[7:])
        print(links[count])
        print()
        count+=1