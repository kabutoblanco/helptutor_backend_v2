# rest_framework
from rest_framework import (generics, status, viewsets)
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
 
# models
from helptutor.knowledge_areas.models import KnowledgeArea_Student
from helptutor.services.models import (Offer, Nomination)
from helptutor.users.models import Student

# serializers
from helptutor.knowledge_areas.serializers import KnowledgeArea_StudentSerializer, KnowledgeArea_StudentViewSerializer


class KnowledgeArea_StudentViewSet(viewsets.ModelViewSet):

    queryset = KnowledgeArea_Student.objects.filter(is_active=True)
    permission_classes = [IsAuthenticated]

    def get_serializer_class(self):  
        """Return serializer based on action."""
        if self.action in ['create', 'partial_update']:
            return KnowledgeArea_StudentSerializer
        return KnowledgeArea_StudentViewSerializer

    def create(self, request, *args, **kwargs):
        request.data['student'] = Student.objects.get(user=request.user.id).pk
        response = super().create(request, *args, **kwargs)
        response.data = KnowledgeArea_StudentViewSerializer(KnowledgeArea_Student.objects.get(pk=response.data['id'])).data
        return response

    def partial_update(self, request, *args, **kwargs):
        request.data['student'] = Student.objects.get(user=request.user.id).pk
        response = super().partial_update(request, *args, **kwargs)
        response.data = KnowledgeArea_StudentViewSerializer(KnowledgeArea_Student.objects.get(pk=response.data['id'])).data
        return response

    def destroy(self, request, pk=None):
        instance = self.get_object()
        instance.is_active = False
        self.perform_update(instance)
        Offer.objects.filter(knowledge_area_student=instance.id).update(is_active=False)
        Nomination.objects.filter(service__knowledge_area_student=instance.id).update(is_active=False)
        return Response(status=status.HTTP_204_NO_CONTENT)


class StudentInterestAPIList(generics.ListAPIView):
    """Returns the specialities of a tutor."""

    permission_classes = [IsAuthenticated]
    serializer_class = KnowledgeArea_StudentSerializer    

    def get_queryset(self):
        return KnowledgeArea_Student.objects.filter(student__user=self.kwargs['pk_user'], is_active=True)