from flask import Flask, request, jsonify
import joblib
import pandas as pd

app = Flask(_name_)
model = joblib.load('random_forest_model.pkl')

@app.route('/predict', methods=['POST'])
def predict():
    data = request.get_json()
    df = pd.DataFrame([data])
    prediction = model.predict(df)
    return jsonify({'prediction': prediction.tolist()})

if _name_ == '_main_':
    app.run(port=5000)