from rest_framework import serializers

from helptutor.services.models import Nomination

from helptutor.users.serializers import TutorViewSerializer


class NominationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Nomination
        fields = '__all__'


class NominationTutorViewSerializer(serializers.ModelSerializer):
    """Retorna la información del tutor que aplica a la nominacion"""
    tutor = TutorViewSerializer(read_only=True)

    class Meta:
        model = Nomination
        fields = '__all__'