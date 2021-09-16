from rest_framework import serializers

from helptutor.services.models import Offer

from helptutor.users.serializers import StudentViewSerializer

class OfferSerializer(serializers.ModelSerializer):
    class Meta:
        model = Offer
        fields = '__all__'


class OfferViewSerializer(serializers.ModelSerializer):
    student = StudentViewSerializer(read_only=True)

    class Meta:
        model = Offer
        fields = '__all__'