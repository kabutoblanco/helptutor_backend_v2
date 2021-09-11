from rest_framework import serializers

from helptutor.knowledge_areas.models import KnowledgeArea_Tutor


class KnowledgeArea_TutorSerializer(serializers.ModelSerializer):

    class Meta:
        model = KnowledgeArea_Tutor
        fields = '__all__'