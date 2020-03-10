import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import seaborn as sns
import tensorflow
import keras

from tensorflow.keras.models import load_model
from sklearn.preprocessing import MinMaxScaler

scaler = MinMaxScaler()

model = load_model('final_ANN_model1.h5')

#data = pd.read_csv('BreastCancerData (4).csv')
#new_data = data.drop('Cancer Positive', axis=1).iloc[1]
#new_data = scaler.fit_transform(new_data.values.reshape(-1, 9))

new_data = scaler.fit([[31, 10.204207, 1, 1, 0, 0, 0, 12, 1]])
print(new_data)

results = model.predict(new_data)

print(results)

print('possibility of having breast cancer is {}'.format(results[0][0]*100))