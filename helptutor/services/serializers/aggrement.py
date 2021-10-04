from rest_framework import serializers

from helptutor.services.models import Aggrement
from helptutor.services.serializers.service import ServiceViewSerializer
from helptutor.users.serializers import StudentViewSerializer


class AggrementSerializer(serializers.ModelSerializer):
    class Meta:
        model = Aggrement
        fields = '__all__'


class AggrementViewSerializer(serializers.ModelSerializer):
    student = StudentViewSerializer(read_only=True)
    service = ServiceViewSerializer(read_only=True)

    class Meta:
        model = Aggrement
        fields = '__all__'