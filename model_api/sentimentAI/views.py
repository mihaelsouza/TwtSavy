from django.shortcuts import render

from rest_framework import viewsets, mixins, views, status
from rest_framework.response import Response

from sentimentAI.models import AI_Model
from sentimentAI.serializers import AI_Model_Serializer

from sentimentAI.models import Requests
from sentimentAI.serializers import Requests_Serializer

import json
import numpy as np
from model_api.wsgi import lstm, model_obj

# Create your views here.

class AI_Model_ViewSet(mixins.RetrieveModelMixin, mixins.ListModelMixin, viewsets.GenericViewSet):
    serializer_class = AI_Model_Serializer
    queryset = AI_Model.objects.all()

class Requests_ViewSet(mixins.RetrieveModelMixin, mixins.ListModelMixin, viewsets.GenericViewSet, mixins.UpdateModelMixin):
    serializer_class = Requests_Serializer
    queryset = Requests.objects.all()

class Predict_View(views.APIView):
    def post(self, request, format = None):
        input = [[data['text'], data['date']] for data in request.data]
        predictions = lstm.compute_prediction(input)

        # Save entries to database
        for entry in predictions:
            exists = Requests.objects.filter(input_data = entry['text'], ai_model = model_obj)
            if not exists:
                Requests(
                    input_data = entry['text'],
                    predicted_sentiment = entry['sentiment'],
                    answer_probability = float(entry['probability']),
                    ai_model = model_obj
                ).save()

        return Response(predictions)