from django.db.models import base
from django.urls import path, include

from rest_framework import routers
from rest_framework.routers import DefaultRouter

from helptutor.schedules.apis import *


router = DefaultRouter()
router.register('timeslot', TimeSlotViewSet, basename='timeslot')

urlpatterns = [
    path('api/tutor/<int:pk_user>/timeslot', TutorTimeSlotAPI.as_view(), name='tutor-timeslots'),
    path('api/', include(router.urls)),
]