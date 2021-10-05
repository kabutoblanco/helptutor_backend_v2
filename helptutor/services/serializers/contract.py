from rest_framework import serializers

from helptutor.services.models import Aggrement, nomination
from helptutor.services.models.contract import Contract


class ContractSerializer(serializers.ModelSerializer):

    class Meta:
        model = Contract
        fields = '__all__'