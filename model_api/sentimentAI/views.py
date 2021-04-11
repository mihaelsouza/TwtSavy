from django.shortcuts import render

from rest_framework import viewsets, mixins, views, status
from rest_framework.response import Response

from sentimentAI.models import AI_Model
from sentimentAI.serializers import AI_Model_Serializer

from sentimentAI.models import Requests
from sentimentAI.serializers import Requests_Serializer

import json
import numpy as np
from model_api.wsgi import e2e_model

# Create your views here.

class AI_Model_ViewSet(mixins.RetrieveModelMixin, mixins.ListModelMixin, viewsets.GenericViewSet):
    serializer_class = AI_Model_Serializer
    queryset = AI_Model.objects.all()

class Requests_ViewSet(mixins.RetrieveModelMixin, mixins.ListModelMixin, viewsets.GenericViewSet, mixins.UpdateModelMixin):
    serializer_class = Requests_Serializer
    queryset = Requests.objects.all()

class Predict_View(views.APIView):
    def post(self, request, format=None):
        input = request.data['input']
        predictions = e2e_model.compute_prediction(input)

        # Save entries to database
        for entry in predictions:
            Requests(
                input_data = entry[0],
                predicted_sentiment = entry[2],
                answer_probability = float(entry[1]),
                ai_model = AI_Model.objects.filter()[0]
            ).save()

        return Response(predictions)