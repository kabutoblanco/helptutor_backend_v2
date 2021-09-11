from rest_framework import serializers

from helptutor.services.models import Aggrement


class AggrementSerializer(serializers.ModelSerializer):
    class Meta:
        model = Aggrement
        fields = '__all__'