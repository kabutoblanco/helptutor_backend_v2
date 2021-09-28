# Django
from django.urls import path, include

# rest_framework
from rest_framework import routers
from rest_framework.routers import DefaultRouter

# urls
from helptutor.users.apis import *

from knox import views as knox_views


router = DefaultRouter()
router.register('tutor', TutorViewSet, basename='tutor-base')
router.register('student', StudentViewSet, basename='student-base')
router.register('review', ReviewViewSet, basename='review-base')

urlpatterns = [
    # path('api/auth', include('knox.urls')),
    path('api/auth/user', UserAPI.as_view()),
    path('api/tutor/google', TutorGoogleAPI.as_view()),
    path('api/student/google', StudentGoogleAPI.as_view()),
    path('api/tutor/<int:pk_user>/review', TutorReviewAPI.as_view()),
    path('api/auth/login/google', LoginGoogleAPI.as_view()),
    path('api/auth/login', LoginAPI.as_view()),
    path('api/auth/logout', knox_views.LogoutView.as_view(), name='knox_logout'),
    path('api/', include(router.urls), name='tutor'),
]
