from flask_cors import CORS
from flask import Flask, request, jsonify
from video_question_engine import get_questions

app = Flask(__name__)
CORS(app)


@app.route('/validate', methods=['POST'])
#define function
def validate():
    return jsonify({"isvalid":True})

@app.route('/prediction', methods=['POST'])

#define function
def predict():
    print(request.get_json()["song_list"][0]["name"])
    results=get_questions(request.get_json()["song_list"][0]["name"])
    print("Length of Result: ",len(results))
    data = [{'date': '19/01/2024', 'name': f'{res}', 'completed': False, 'year': 0} for res in results]
    return jsonify({'data': data})



if __name__=="__main__":
    app.run(port=6001,debug=True)