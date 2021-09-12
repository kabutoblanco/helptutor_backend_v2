# Django
from django.db import transaction
from django.views import generic

# rest_framework
from rest_framework import (generics, viewsets)
from rest_framework.permissions import (
    AllowAny,
    IsAuthenticated
)

# models
from helptutor.users.models import Student

# serializers
from helptutor.users.serializers import *


class StudentViewSet(viewsets.ModelViewSet):

    queryset = Student.objects.filter(is_active=True)
    serializer_class = StudentViewSerializer

    def get_permissions(self):
        """Assign permissions based on action."""
        if self.action in ['create', 'retrieve']:
            permissions = [AllowAny]
        else:
            permissions = [IsAuthenticated]
        return [p() for p in permissions]

    def get_serializer_class(self):      
        """Return serializer based on action."""
        if self.action in ['create']:
            return StudentCreateSerializer
        elif self.action in ['partial_update']:
            return StudentUpdateSerializer
        return StudentViewSerializer
    
    @transaction.atomic
    def create(self, request, *args, **kwargs):
        request.data['user']['username'] = request.data['user']['email']
        return super().create(request, *args, **kwargs)

    def partial_update(self, request, *args, **kwargs):
        user = self.get_object()
        serializer = UserUpdateSerializer(user, 
                                          data=request.data.pop('user'),
                                          partial=True)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return super().update(request, *args, **kwargs)

    def get_object(self):
        """Returns a student based on the user's id"""
        return Student.objects.get(user=self.kwargs['pk'])


class StudentGoogleAPI(generics.CreateAPIView):
    """StudentGoogle view set."""

    serializer_class = StudentGoogleCreateSerializer
    permission_classes = [AllowAny]