from flask import Flask, request, jsonify
import cohere
import os

app = Flask(__name__)

# Reading the .env file to retrieve the API key
def load_env():
    with open('.env', 'r') as f:
        for line in f:
            if line.strip():
                key, value = line.strip().split('=', 1)
                os.environ[key] = value

# Load the environment variables
load_env()

# Getting the API key from the environment
api_key = os.getenv('API_KEY')

@app.route('/cohere', methods=['POST'])
def cohere_chat():
    # Get the data from the POST request.
    data = request.get_json()
    
    # Create a Cohere client.
    co = cohere.Client(api_key)

    # Send a chat request to the Cohere API.
    response = co.chat(
        chat_history=[
        {"role": "USER", "message": "Who discovered gravity?"},
        {"role": "CHATBOT", "message": "The man who is widely credited with discovering gravity is Sir Isaac Newton"}
        ],
        message=data['message'],
        # perform web search before answering the question. You can also use your own custom connector.
        connectors=[{"id": "web-search"}]
    )

    # Return the response ID as a JSON response.
    return jsonify({'text': response.text})

if __name__ == '__main__':
    app.run(debug=True)