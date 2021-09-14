from rest_framework import serializers

from helptutor.knowledge_areas.models import KnowledgeArea_Tutor

from helptutor.knowledge_areas.serializers.knowledge_area import KnowledgeAreaSerializer


class KnowledgeArea_TutorSerializer(serializers.ModelSerializer):
    knowledge_area = KnowledgeAreaSerializer()

    class Meta:
        model = KnowledgeArea_Tutor
        fields = '__all__'