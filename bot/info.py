import requests
import json
from datetime import datetime


def buscar_imagem_gtin(gtin):
    # Chave de API e ID do mecanismo de busca personalizado
    # kaique: AIzaSyBtIXpmbgieYemH7c1khYhlYjsNYEEsikM
    google_api_key = "AIzaSyDyMXuKWs4C21oKSod4b8g_tHYsIK3bYC4"
    custom_search_engine_id = "56a4e26d21fa64acb"

    # URL da API de busca personalizada do Google
    search_url = f"https://www.googleapis.com/customsearch/v1?key={google_api_key}&cx={custom_search_engine_id}&q={gtin}&searchType=image&num=1"

    response = requests.get(search_url)
    search_results = response.json()

    # Verifica se há resultados e retorna o link da imagem
    try:
        image_link = search_results["items"][0]["link"]
        return image_link
    except (KeyError, IndexError):
        return None


def consultar_chave(chave, save=False):
    # Chave teste: 35240301157555005416590008360823622700571612
    url = "https://api.infosimples.com/api/v2/consultas/sefaz/sp/cfe-completa"
    args = {
        "chave": chave,
        "token": "e4MR7sOgjb0i-jO2Rx3ssOz8QTxgyRiqXq20pHHf",
        "timeout": 300,
    }

    response = requests.post(url, args)
    response_json = response.json()
    response.close()

    informacoes = {}

    if response_json["code"] == 200:
        data_list = response_json.get("data", [])
        if data_list:
            data = data_list[0]  # Pegando o primeiro dicionário da lista

            # Extração de informações específicas
            dados_cfe = data.get("cfe", {}).get("dados_cfe", {})
            numero_cfe = dados_cfe.get("numero_cfe", "Informação não disponível")
            valor_cfe = dados_cfe.get("valor_cfe", "Informação não disponível")
            data_hora = data.get("cfe", {}).get(
                "data_hora_emissao", str(datetime.now())
            )

            emitente = data.get("emitente", {})
            nome_razao_social = emitente.get(
                "nome_razao_social", "Informação não disponível"
            )

            informacoes["numero_cfe"] = numero_cfe
            informacoes["valor_completo"] = valor_cfe
            informacoes["nome_razao_social"] = nome_razao_social
            informacoes["data_hora"] = data_hora

            # Extração de informações específicas dos produtos e serviços
            produtos = data.get("produtos_servicos", [])
            informacoes["produtos"] = []
            for produto in produtos:
                num = produto.get("num", "Informação não disponível")
                nome = produto.get("descricao", "Informação não disponível")
                qtd_comercial = produto.get(
                    "qtd_comercial", "Informação não disponível"
                )
                valor_unitario = produto.get(
                    "valor_unitario", "Informação não disponível"
                )
                valor_bruto = produto.get("valor_bruto", "Informação não disponível")
                codigo_gtin = produto.get("codigo_gtin", "Informação não disponível")
                imagem = buscar_imagem_gtin(codigo_gtin)

                produto_info = {
                    "nome": nome,
                    "quantidade": qtd_comercial,
                    "valor_unitario": valor_unitario,
                    "valor_total": valor_bruto,
                    "codigo": codigo_gtin,
                    "imagem": imagem,
                }
                informacoes["produtos"].append(produto_info)

            if save:
                with open(
                    "informacoes_nota_fiscal.json", "w", encoding="utf-8"
                ) as json_file:
                    json.dump(informacoes, json_file, ensure_ascii=False, indent=4)

            return informacoes
        else:
            print("Nenhum dado disponível na resposta.")
            raise Exception("Nenhum dado disponível na resposta.")

    elif response_json["code"] in range(600, 799):
        mensagem = "Resultado sem sucesso. Leia para saber mais: \n"
        mensagem += "Código: {} ({})\n".format(
            response_json["code"], response_json["code_message"]
        )
        mensagem += "; ".join(response_json["errors"])
        print(mensagem)
        raise Exception(mensagem)

    else:
        print("Erro desconhecido.")
        raise Exception("Erro desconhecido.")
