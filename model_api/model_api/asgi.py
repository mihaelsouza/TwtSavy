"""
ASGI config for model_api project.

It exposes the ASGI callable as a module-level variable named ``application``.

For more information on this file, see
https://docs.djangoproject.com/en/3.2/howto/deployment/asgi/
"""

import os

from django.core.asgi import get_asgi_application

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'model_api.settings')

application = get_asgi_application()

from lstm_model.e2e_model import E2E_Model
from sentimentAI.models import AI_Model

try:
  e2e_model = E2E_Model() # Initialize the model

  # Register the pertinent model information at the /info endpoint
  AI_Model.objects.get_or_create(
    name = 'lstm',
    description = 'Long Short Term Memory model built using the Twitter GloVe embeddings on the embeddings layer. Model trained an validated based on the sentiment140 dataset, containing 1.6 million tweets.',
    built_in = 'Keras/Tensorflow 2.4.1 using TextVectorizer and LSTM.',
    accuracy = '82%'
  )


except Exception as e:
  print('Exception while initializing the model and registering information', str(e))