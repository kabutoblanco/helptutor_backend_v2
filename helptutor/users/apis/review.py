# Django
from django.db import transaction

# rest_framework
from rest_framework import generics, viewsets, mixins

# models
from helptutor.users.models import Review

# serializers
from helptutor.users.serializers import ReviewSerializer


class ReviewViewSet(viewsets.ModelViewSet):

    queryset = Review.objects.filter(is_active=True)
    serializer_class = ReviewSerializer


class TutorReviewAPI(generics.ListAPIView):
    
    serializer_class = ReviewSerializer

    def get_queryset(self):
        return Review.objects.filter(tutor__user=self.kwargs['pk_user'], is_active=True)
