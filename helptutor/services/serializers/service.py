from rest_framework import serializers

from helptutor.services.models import Service

from helptutor.users.serializers import TutorViewSerializer

class ServiceViewSerializer(serializers.ModelSerializer):
    tutor = TutorViewSerializer(read_only=True)
    
    class Meta:
        model = Service
        fields = '__all__'


class ServiceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Service
        fields = '__all__'