# rest-framework
from rest_framework import serializers

# models
from helptutor.advertisements.models import Advertisement

# serializers
from helptutor.users.serializers import StudentViewSerializer


class AdvertisementSerializer(serializers.ModelSerializer):

    class Meta:
        model = Advertisement
        fields = '__all__'


class AdvertisementViewSerializer(serializers.ModelSerializer):
    student = StudentViewSerializer(read_only=True)
    
    class Meta:
        model = Advertisement
        fields = '__all__'