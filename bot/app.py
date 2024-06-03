from flask import Flask, request, jsonify
from urllib.parse import unquote
from webScraping import lerPaginaQrCode
from info import consultar_chave
import re

app = Flask(__name__)

sp_sefaz_url = "https://www.nfce.fazenda.sp.gov.br/NFCeConsultaPublica/Paginas/ConsultaQRCode.aspx?p="


@app.route("/qrcode/<path:url>", methods=["GET"])
def get_qr_code_info(url):
    try:
        url = url.replace("%3F", "?")
        qr_code_info = lerPaginaQrCode(url)
        return jsonify(qr_code_info)
    except Exception as e:
        return jsonify({"error": str(e)}), 500


@app.route("/qrcodep/<path:p>", methods=["GET"])
def get_qr_code_info_by_param(p):
    try:
        qr_code_info = lerPaginaQrCode(sp_sefaz_url + unquote(p))
        return jsonify(qr_code_info)
    except Exception as e:
        return jsonify({"error": str(e)}), 500


@app.route("/consultar-cfe/<chave>", methods=["GET"])
def consultar_cfe(chave):
    try:
        print("starting consultar_cfe")
        qr_code_info = consultar_chave(chave)
        print("finished consultar_cfe")
        return jsonify(qr_code_info)
    except Exception as e:
        return jsonify({"error": str(e)}), 500


if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0", port=5000)
