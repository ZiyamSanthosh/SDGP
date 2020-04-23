
#Importing necessary Modules
import tensorflow as tf
from flask import Flask, request, jsonify
from flask_cors import CORS, cross_origin
import numpy as np
from tensorflow import keras
import joblib

#Loading the h5 model(ANN model) and the Pickle model(Scaler object in the ANN Model)
new_model = keras.models.load_model('final_ANN_model1.h5')
Neural_scaler = joblib.load('ANN_scaler.pkl')

#Initializing the flask app
app = Flask(__name__)
#Enabling cors in flask 
CORS(app)

#Route for prediction
@app.route('/predict',methods=['POST'])
@cross_origin() #Allowing all origins to access the route
def predict():

    #Accessing the json object in the post request form the nodejs API
    content = request.get_json()

    #Assigning values to the int_feature array from the Json object
    int_features = [
        content['Age'],
        content['BMI'],
        content['Breast_Feeding'],
        content['Marital_Status'],
        content['Alcohol'],
        content['Smoking'],
        content['Breast_Cancer_History'],
        content['Age_at_first_period'],
        content['Menstrual_Cycle']
    ]

    #Scaling and transforming the int_feature array and store it in a final_features array which has normalize values
    final_features = Neural_scaler.transform(np.array(int_features).reshape(-1,9))

    #Sending the final_features to the model and getting the prediction
    raw_prediction = new_model.predict(final_features)[0][0]*100

    print(raw_prediction) #Printing the prediction form the model to the console for debug purposes

    return jsonify(raw_prediction) #Returning the prediction value as a Json response



if __name__ == "__main__":
    app.run(debug=True)