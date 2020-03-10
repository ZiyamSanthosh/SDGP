#!/usr/bin/env python
# coding: utf-8

# In[113]:


import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import seaborn as sns
import tensorflow
import keras


# In[114]:


df = pd.read_csv('BreastCancerData (4).csv')


# In[115]:


df.head()


# In[116]:


df.describe().transpose()


# In[117]:


df.info()


# In[118]:


sns.countplot(x='Cancer Positive',data=df)


# In[119]:


df.corr()['Cancer Positive'][:-1].sort_values()


# In[120]:


X = df.drop('Cancer Positive',axis=1).values
y = df['Cancer Positive'].values


# In[121]:


X


# In[122]:


X.shape


# In[123]:


y


# In[124]:


y.shape


# In[125]:


from sklearn.model_selection import train_test_split


# In[126]:


X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.25, random_state=101)


# In[127]:


from sklearn.preprocessing import MinMaxScaler


# In[128]:


scaler = MinMaxScaler()


# In[129]:


X_train = scaler.fit_transform(X_train)


# In[130]:


X_test = scaler.transform(X_test)


# In[131]:


X_train.shape


# In[132]:


from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import Dense


# In[133]:


model = Sequential()

model.add(Dense(9,activation='relu',input_shape=(9, )))
model.add(Dense(9,activation='relu'))
model.add(Dense(1,activation='sigmoid'))

model.compile(loss='binary_crossentropy',optimizer='adam')


# In[134]:


model.fit(x=X_train,y=y_train,epochs=1000,validation_data=(X_test,y_test),batch_size=128)


# In[135]:


losses = pd.DataFrame(model.history.history)


# In[136]:


losses


# In[137]:


losses.plot()


# In[138]:


model = Sequential()

model.add(Dense(9,activation='relu',input_shape=(9, )))
model.add(Dense(9,activation='relu'))
model.add(Dense(1,activation='sigmoid'))

model.compile(loss='binary_crossentropy',optimizer='adam')


# In[139]:


from tensorflow.keras.callbacks import EarlyStopping


# In[140]:


early_stop = EarlyStopping(monitor='val_loss',mode='min',verbose=1,patience=25)


# In[141]:


model.fit(x=X_train,y=y_train,epochs=1000,validation_data=(X_test,y_test),
         callbacks=[early_stop],batch_size=128)


# In[142]:


model_loss = pd.DataFrame(model.history.history)
model_loss.plot()


# In[143]:


predictions = model.predict_classes(X_test)


# In[144]:


predictions


# In[145]:


from sklearn.metrics import classification_report,confusion_matrix


# In[146]:


print(confusion_matrix(y_test,predictions))


# In[147]:


print(classification_report(y_test,predictions))


# In[148]:


from tensorflow.keras.models import load_model


# In[149]:


model.save('final_ANN_model1.h5')


# In[ ]:




