# django
from django.urls import path, include

# rest_framework
from rest_framework.routers import DefaultRouter

# apis
from helptutor.advertisements.apis import *

router = DefaultRouter()
router.register('advertisement', AdvertisementViewSet)
router.register('answer', AnswerViewSet)

urlpatterns = [
    path('api/', include(router.urls)),
]