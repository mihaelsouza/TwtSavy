from django.db import models

# Create your models here.
class AI_Model(models.Model):
  name = models.CharField(max_length = 128)
  description = models.CharField(max_length = 1000)
  built_in = models.CharField(max_length = 128)
  accuracy = models.CharField(max_length = 128)

class Requests(models.Model):
  input_data = models.CharField(max_length = 400)
  predicted_sentiment = models.CharField(max_length = 10)
  answer_probability = models.DecimalField(max_digits = 4, decimal_places = 3)
  ai_model = models.ForeignKey(AI_Model, on_delete=models.CASCADE)