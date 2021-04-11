import os
os.environ['TF_CPP_MIN_LOG_LEVEL'] = '3' # Disable TF debbuging info printout

import re
import sys
import html
import pathlib
import numpy as np
import pandas as pd
import tensorflow as tf

from tensorflow import keras
from tensorflow.keras.layers.experimental.preprocessing import TextVectorization

class E2E_Model:
    def __init__(self):
        self.path = str(pathlib.Path().absolute())
        self.vectorizer, self.model = self.load_model_components(self.path)
        self.e2e_model = self.initialize_model(self.vectorizer, self.model)

    def load_model_components(self, path):
        # TextVectorizer layer
        vocab = pd.read_json(path + '/lstm_model/vectorizer_vocab.json', typ = 'series')
        vectorizer = TextVectorization(max_tokens = 20001, output_sequence_length = 50)
        vectorizer.set_vocabulary(vocab.values)

        # Trained Model
        model = keras.models.load_model(path + '/lstm_model/model_weights.h5')

        return vectorizer, model

    def initialize_model(self, vectorizer, model):
        input = keras.Input(shape=(1,), dtype = 'string')
        x = vectorizer(input)
        preds = model(x)
        e2e_model = keras.Model(input, preds)

        return e2e_model

    def clean_string(self, string):
        string = html.unescape(string) # Remove html tags
        string = re.sub(r'@[A-Za-z0-9]+', '', string) # Remove mentions
        string = re.sub(r'https?://[A-Za-z0-9./]+', '', string) # Remove links/urls
        string = re.sub(r'#[A-Za-z0-9]+', '', string) # Remove hashtags
        string = re.sub(r'[^A-Za-z\s]+', '', string) # Removes numbers and special characters
        string = re.sub(r'\s\s+', ' ', string) # Substitutes multiple whitespaces by single instances
        string = string.lower().strip() # Sets all to lower case and remove leading/trailing spaces

        return string if string != '' else np.nan # Avoid saving empty strings

    def get_sentiment(self, string, model):
        labels = {0: 'negative', 1: 'positive'}

        result = model.predict([string])
        prediction = [np.max(result), np.argmax(result)]

        return prediction[0], labels[prediction[1]]

    def compute_prediction(self, input_data):
        strings = [self.clean_string(string) for string in input_data]
        predictions = [self.get_sentiment(string, self.e2e_model) for string in strings]

        return predictions