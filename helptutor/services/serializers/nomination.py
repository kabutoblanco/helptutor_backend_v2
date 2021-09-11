from rest_framework import serializers

from helptutor.services.models import Nomination


class NominationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Nomination
        fields = '__all__'