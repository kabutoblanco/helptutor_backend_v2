# rest-framework
from rest_framework import serializers

# models
from helptutor.advertisements.models import Advertisement

# serializers
from helptutor.users.serializers import StudentViewSerializer


class AdvertisementSerializer(serializers.ModelSerializer):
    student = StudentViewSerializer

    class Meta:
        model = Advertisement
        fields = '__all__'