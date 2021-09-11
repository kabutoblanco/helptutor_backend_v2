# rest_framework
from rest_framework import (generics, viewsets)
from rest_framework.permissions import IsAuthenticated

# models
from helptutor.knowledge_areas.models import KnowledgeArea

# serialzers
from helptutor.knowledge_areas.serializers import KnowledgeAreaSerializer
 

class KnowledgeAreaViewSet(viewsets.ModelViewSet):

    queryset = KnowledgeArea.objects.filter(level=0, is_active=True)
    serializer_class = KnowledgeAreaSerializer
    permission_classes = [IsAuthenticated]


class KnowledgeAreaCategoryAPIView(generics.ListAPIView):
    """Returns sub-knowledgeareas of a knowledgearea."""

    serializer_class = KnowledgeAreaSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return KnowledgeArea.objects.filter(knowledge_area=self.kwargs['pk'], level=1, is_active=True)