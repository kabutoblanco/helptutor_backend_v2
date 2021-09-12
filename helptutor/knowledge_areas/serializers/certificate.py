from rest_framework import serializers

from helptutor.knowledge_areas.models import Certificate


class CertificateSerializer(serializers.ModelSerializer):

    def create(self, validated_data):
        # por alguna razón no toma el valor por defecto de is_active=True
        validated_data['is_active'] = True
        return super().create(validated_data)

    class Meta:
        model = Certificate
        fields = '__all__'