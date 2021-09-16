"""KnowledgeArea_Tutor view set."""


# rest_framework
from rest_framework import (generics, status, viewsets)
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

# models
from helptutor.knowledge_areas.models import KnowledgeArea_Tutor
from helptutor.services.models import (Aggrement, Service)
from helptutor.users.models import Tutor

# serializers
from helptutor.knowledge_areas.serializers import *


class KnowledgeArea_TutorViewSet(viewsets.ModelViewSet):
    """KnowledgeArea_Tutor view set."""

    queryset = KnowledgeArea_Tutor.objects.filter(is_active=True)
    permission_classes = [IsAuthenticated]

    def get_serializer_class(self):  
        """Return serializer based on action."""
        if self.action in ['create', 'partial_update']:
            return KnowledgeArea_TutorSerializer
        return KnowledgeArea_TutorViewSerializer

    def create(self, request, *args, **kwargs):
        request.data['tutor'] = Tutor.objects.get(user=request.user.id).pk
        response = super().create(request, *args, **kwargs)
        response.data = KnowledgeArea_TutorViewSerializer(KnowledgeArea_Tutor.objects.get(pk=response.data['id'])).data
        return response

    def partial_update(self, request, *args, **kwargs):
        request.data['tutor'] = Tutor.objects.get(user=request.user.id).pk
        response = super().partial_update(request, *args, **kwargs)
        response.data = KnowledgeArea_TutorViewSerializer(KnowledgeArea_Tutor.objects.get(pk=response.data['id'])).data
        return response

    def destroy(self, request, pk=None):
        instance = self.get_object()
        instance.is_active = False
        self.perform_update(instance)
        Service.objects.filter(knowledge_area_tutor=instance.id).update(is_active=False)
        Aggrement.objects.filter(service__knowledge_area_tutor=instance.id).update(is_active=False)
        return Response(status=status.HTTP_204_NO_CONTENT)


class TutorSpecialityAPIList(generics.ListAPIView):
    """Returns the specialities of a tutor."""

    serializer_class = KnowledgeArea_TutorViewSerializer    
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return KnowledgeArea_Tutor.objects.filter(tutor__user=self.kwargs['pk_user'], is_active=True)
