import time
import re

from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.service import Service
from webdriver_manager.chrome import ChromeDriverManager


def lerPaginaQrCode(link):
    # Configura o Chrome para rodar em modo headless
    chrome_options = Options()
    chrome_options.add_argument("--no-sandbox")
    chrome_options.add_argument("--headless")
    chrome_options.add_argument("--disable-dev-shm-usage")

    driver = webdriver.Chrome(
        service=Service(ChromeDriverManager().install()), options=chrome_options
    )

    # URL da página que você quer fazer scrapping
    driver.get(link)

    lista_produtos = []
    # Agora, localize os elementos que contêm as informações dos produtos
    # Neste caso, estou assumindo que os produtos estão em elementos com id 'tabResult'
    produtos = driver.find_elements(By.CSS_SELECTOR, "#tabResult tr")

    time.sleep(1)

    for produto in produtos:

        info_produto = {}

        # Para cada produto, extraia as informações desejadas'
        # Por exemplo, nome do produto, código, quantidade, valor unitário, e valor total
        info_produto["nome"] = produto.find_element(By.CSS_SELECTOR, ".txtTit").text

        # Extrair apenas os números do texto usando expressões regulares
        codigo_text = produto.find_element(By.CSS_SELECTOR, ".RCod").text.replace(
            "-", ""
        )
        codigo_completo = re.search(r"Código: (\d+)", codigo_text)
        if codigo_completo:
            info_produto["codigo"] = codigo_completo.group(1)

        quantidade_text = produto.find_element(By.CSS_SELECTOR, ".Rqtd").text
        quantidade_numeros = re.findall(r"\d+", quantidade_text)
        if quantidade_numeros:
            info_produto["quantidade"] = int(quantidade_numeros[0])

        valor_unitario_text = produto.find_element(By.CSS_SELECTOR, ".RvlUnit").text
        valor_unitario_decimal = re.search(r"(\d+,\d+)", valor_unitario_text)
        # Se um valor unitário decimal for encontrado, utilize-o
        if valor_unitario_decimal:
            valor_unitario_str = valor_unitario_decimal.group(1)
            info_produto["valor_unitario"] = valor_unitario_str

        info_produto["valor_total"] = produto.find_element(
            By.CSS_SELECTOR, ".valor"
        ).text

        lista_produtos.append(info_produto)

    valor_completo = driver.find_element(By.CSS_SELECTOR, "#totalNota")
    valor_completo_exibido = valor_completo.find_element(
        By.CSS_SELECTOR, ".txtMax"
    ).text

    objeto_final = {
        "produtos": lista_produtos,
        "valor_completo": valor_completo_exibido,
    }

    # Não esqueça de fechar o driver depois da operação
    driver.quit()

    return objeto_final
