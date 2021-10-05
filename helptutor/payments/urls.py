from django.urls import path, include

from rest_framework import routers
from rest_framework.routers import DefaultRouter

from helptutor.payments.apis.payment import PaymentViewSet


router = DefaultRouter()
router.register('payment', PaymentViewSet)

urlpatterns = [
    path('api/', include(router.urls)),
]