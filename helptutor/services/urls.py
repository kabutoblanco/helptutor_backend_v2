from django.urls import path, include

from rest_framework import routers
from rest_framework.routers import DefaultRouter

from helptutor.services.apis import *

router = DefaultRouter()
router.register('service', ServiceAPIView)
router.register('offer', OfferAPIView)
router.register('aggrement', AggrementAPIView)
router.register('nomination', NominationAPIView)

urlpatterns = [
    path('api/tutor/<int:pk_user>/service/', TutorServiceAPI.as_view(), name='tutor-services'),
    path('api/tutor/<int:pk_user>/nomination/', TutorNominationAPI.as_view(), name='tutor-nominations'),
    path('api/tutor/offer/', TutorOfferAPI.as_view(), name='tutor-offers'),
    path('api/student/<int:pk_user>/offer/', StudentOfferAPI.as_view(), name='student-offers'),
    path('api/student/<int:pk_user>/aggrement/', StudentAggrementAPI.as_view(), name='student-aggrements'),
    path('api/tutor/<int:pk_user>/aggrement/', TutorAggrementAPI.as_view(), name='tutor-aggrements'),
    path('api/nomination/<int:pk_offer>/tutor/', NominationTutorAPI.as_view(), name='nomination-offers'),
    path('api/offer/<int:pk_offer>/nomination/', NominationTutorAPI.as_view(), name='offer-nominations'),
    path('api/', include(router.urls)),    
]