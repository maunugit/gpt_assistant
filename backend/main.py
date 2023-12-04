from flask import Flask, request, jsonify
from flask_cors import CORS
import openai
import logging
import os

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})

logging.basicConfig(level=logging.DEBUG, format='%(asctime)s %(levelname)s:%(message)s')

OPENAI_API_KEY = os.getenv('OPENAI_API_KEY')
if not OPENAI_API_KEY:
    raise RuntimeError("OPENAI_API_KEY is not set in the environment variables")

openai.api_key = OPENAI_API_KEY



@app.route('/message', methods=['POST'])
def handle_message():
    user_message = request.json.get('message')
    if not user_message:   
        logging.error('No message provided in request')
        return jsonify({"error": "No message provided"}), 400

    try:
        logging.debug('Received user message: %s', user_message)
        response = openai.ChatCompletion.create(
            model="gpt-4",
            messages=[
                {"role": "system", "content": "You are a helpful assistant."},
                {"role": "user", "content": user_message}
            ]
        )
        ai_message = response['choices'][0]['message']['content']
        logging.debug('AI response: %s', ai_message)
        return jsonify({"reply": ai_message})
    except Exception as e:
        logging.exception('Error processing message: %s', user_message)
        return jsonify({"error": str(e)}), 500

@app.route('/')
def index():
    return 'Flask server is running!'

if __name__ == '__main__':
    app.run(debug=True)
