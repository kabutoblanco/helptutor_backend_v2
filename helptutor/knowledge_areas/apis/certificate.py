# rest_framework
from helptutor.knowledge_areas.models.knowledge_area_tutor import KnowledgeArea_Tutor
from rest_framework import (generics, status, viewsets)
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

# models
from helptutor.knowledge_areas.models import Certificate
from helptutor.services.models import (Aggrement, Service)

# serializers
from helptutor.knowledge_areas.serializers import CertificateSerializer


class CertificateViewSet(viewsets.ModelViewSet):

    queryset = Certificate.objects.filter(is_active=True)
    serializer_class = CertificateSerializer
    permission_classes = [IsAuthenticated]

    def destroy(self, request, pk=None):
        instance = self.get_object()
        instance.is_active = False
        self.perform_update(instance)
        id_speciality = instance.knowledge_area_tutor.id
        Certificate.objects.filter(knowledge_area_tutor=id_speciality, is_active=True).update(is_active=False)
        KnowledgeArea_Tutor.objects.filter(pk=id_speciality).update(is_active=False)
        Service.objects.filter(knowledge_area_tutor=id_speciality).update(is_active=False)
        Aggrement.objects.filter(service__knowledge_area_tutor=id_speciality).update(is_active=False)        
        return Response(status=status.HTTP_204_NO_CONTENT)


class KnowledgeAreaCertificateAPI(generics.ListAPIView):
    
    serializer_class = CertificateSerializer

    def get_queryset(self):
        return Certificate.objects.filter(knowledge_area_tutor=self.kwargs['pk'], is_active=True)