import requests


def get_exchange_rate():
    api_url = "https://api-dolar-argentina.herokuapp.com/api/dolarblue"
    response = requests.get(api_url)
    return response.json()
