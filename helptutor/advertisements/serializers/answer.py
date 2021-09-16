# rest-framework
from rest_framework import serializers

# models
from helptutor.advertisements.models import Answer

from helptutor.users.serializers.user import UserViewSerializer


class AnswerSerializer(serializers.ModelSerializer):

    class Meta:
        model = Answer
        fields = '__all__'


class AnswerViewSerializer(serializers.ModelSerializer):
    # TODO
    user = UserViewSerializer(read_only=True)

    class Meta:
        model = Answer
        fields = '__all__'