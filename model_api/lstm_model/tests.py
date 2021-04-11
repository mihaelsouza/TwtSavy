import inspect

from django.test import TestCase
from lstm_model.e2e_model import E2E_Model

class ML_Tests(TestCase):
    def test_lstm(self):
        input_data = ['t@)his is a st190ring!', 'this is great!', 'this is terrible...']
        e2e_model = E2E_Model()

        results = e2e_model.compute_prediction(input_data)
        self.assertEqual('positive', results[0][1])
        self.assertEqual('positive', results[1][1])
        self.assertEqual('negative', results[2][1])