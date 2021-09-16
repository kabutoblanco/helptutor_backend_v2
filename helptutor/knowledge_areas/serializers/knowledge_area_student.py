from rest_framework import serializers

from helptutor.knowledge_areas.models import KnowledgeArea_Student

from helptutor.knowledge_areas.serializers.knowledge_area import KnowledgeAreaSerializer


class KnowledgeArea_StudentSerializer(serializers.ModelSerializer):

    class Meta:
        model = KnowledgeArea_Student
        fields = '__all__'

        
class KnowledgeArea_StudentViewSerializer(serializers.ModelSerializer):
    knowledge_area = KnowledgeAreaSerializer(read_only=True)

    class Meta:
        model = KnowledgeArea_Student
        fields = '__all__'