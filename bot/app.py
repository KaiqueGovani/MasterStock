from flask import Flask, request, jsonify
from urllib.parse import unquote
from webScraping import lerPaginaQrCode

app = Flask(__name__)

@app.route('/qrcode/<path:url>', methods=['GET'])
def get_qr_code_info(url):
    try:
        url = url.replace('%3F', '?')
        qr_code_info = lerPaginaQrCode(url)
        return jsonify(qr_code_info)
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)