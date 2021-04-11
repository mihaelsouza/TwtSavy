import inspect

from django.test import TestCase
from djangoServer.lstm.registry import MLRegistry
from djangoServer.lstm.e2e_model import E2E_Model

class ML_Tests(TestCase):
    def test_lstm(self):
        input_data = ['t@)his is a st190ring!', 'this is great!', 'this is terrible...']
        e2e_model = E2E_Model()

        results = e2e_model.compute_prediction(input_data)
        self.assertEqual('positive', results[0][1])
        self.assertEqual('positive', results[1][1])
        self.assertEqual('negative', results[2][1])

def test_registry(self):
        registry = MLRegistry()
        self.assertEqual(len(registry.endpoints), 0)

        endpoint_name = "lstm_sentiment_classifier"
        algorithm_object = E2E_Model()
        algorithm_name = "long short term memory"
        algorithm_owner = "M. M. de Souza"
        algorithm_description = "LSTM with GloVe embeddings"

        # add to registry
        registry.add_algorithm(endpoint_name, algorithm_object, algorithm_name,
            algorithm_owner, algorithm_description, algorithm_code)
        # there should be one endpoint available
        self.assertEqual(len(registry.endpoints), 1)