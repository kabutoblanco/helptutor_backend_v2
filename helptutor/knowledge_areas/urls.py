from django.urls import path, include
 
from rest_framework import routers
from rest_framework.routers import DefaultRouter

from helptutor.knowledge_areas.apis import *

router = DefaultRouter()
router.register('knowledgearea', KnowledgeAreaViewSet, basename='knowledgearea')
router.register('knowledgearea_tutor', KnowledgeArea_TutorViewSet, basename='knowledgearea-tutor')
router.register('knowledgearea_student', KnowledgeArea_StudentViewSet, basename='knowledgearea-student')
router.register('certificate', CertificateViewSet, basename='certificate')

urlpatterns = [
    path('api/knowledgearea/<int:pk>/knowledgearea/', KnowledgeAreaCategoryAPIView.as_view(), name='specialities'),
    path('api/tutor/<int:pk_user>/knowledgearea/', TutorSpecialityAPIList.as_view(), name='tutor-specialities'),
    path('api/student/<int:pk_user>/knowledgearea/', StudentInterestAPIList.as_view(), name='student-insterests'),
    path('api/', include(router.urls)),
]