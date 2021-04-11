from rest_framework import serializers
from sentimentAI.models import AI_Model
from sentimentAI.models import Requests

class AI_Model_Serializer(serializers.ModelSerializer):
  class Meta:
    model = AI_Model
    read_only_fields = ('id', 'name', 'description', 'built_in', 'accuracy')
    fields = read_only_fields

class Requests_Serializer(serializers.ModelSerializer):
  class Meta:
    model = Requests
    read_only_fields = ('id', 'predicted_sentiment', 'answer_probability', 'ai_model')