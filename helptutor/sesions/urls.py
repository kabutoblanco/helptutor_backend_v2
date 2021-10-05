from django.urls import path, include

from rest_framework import routers
from rest_framework.routers import DefaultRouter

from helptutor.sesions.apis import *


router = DefaultRouter()
router.register('sesion', SesionViewSet)

urlpatterns = [
    path('api/', include(router.urls)),
]