# import cohere
# co = cohere.Client(API)
# response = co.chat(
#     chat_history=[
#     {"role": "USER", "message": "Who discovered gravity?"},
#     {"role": "CHATBOT", "message": "The man who is widely credited with discovering gravity is Sir Isaac Newton"}
#     ],
#     message="What year was he born?",
#     # perform web search before answering the question. You can also use your own custom connector.
#     connectors=[{"id": "web-search"}]
# )

# print(response.id)

from flask import Flask, request, jsonify
import cohere

app = Flask(__name__)

@app.route('/cohere', methods=['POST'])
def cohere_chat():
    # Get the data from the POST request.
    data = request.get_json()
    
    # Create a Cohere client.
    co = cohere.Client('Pxv343hL1UC3IrmqmAwS7e5qRCpc9Dg4duIzckcj')

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