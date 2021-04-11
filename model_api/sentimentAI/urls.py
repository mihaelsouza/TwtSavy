from django.conf.urls import url, include
from rest_framework.routers import DefaultRouter

from sentimentAI.views import AI_Model_ViewSet
from sentimentAI.views import Requests_ViewSet
from sentimentAI.views import Predict_View

router = DefaultRouter(trailing_slash = False)
router.register(r"info", AI_Model_ViewSet, basename = 'info')
router.register(r"requests", Requests_ViewSet, basename = 'requests')

urlpatterns = [
    url(r"^api/v1/", include(router.urls)),
    url(r"^api/v1/predict$", Predict_View.as_view(), name='predict')
]