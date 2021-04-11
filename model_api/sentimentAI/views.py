import json
from django.shortcuts import render

from rest_framework import viewsets, mixins, views, status
from rest_framework.response import Response

from sentimentAI.models import AI_Model
from sentimentAI.serializers import AI_Model_Serializer

from sentimentAI.models import Requests
from sentimentAI.serializers import Requests_Serializer

# Create your views here.

class AI_Model_ViewSet(mixins.RetrieveModelMixin, mixins.ListModelMixin, viewsets.GenericViewSet):
    serializer_class = AI_Model_Serializer
    queryset = AI_Model.objects.all()

class Requests_ViewSet(mixins.RetrieveModelMixin, mixins.ListModelMixin, viewsets.GenericViewSet, mixins.UpdateModelMixin):
    serializer_class = Requests_Serializer
    queryset = Requests.objects.all()