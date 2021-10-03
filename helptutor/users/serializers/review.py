from rest_framework import serializers

from helptutor.users.models import Review
from helptutor.users.serializers.student import StudentViewSerializer


class ReviewSerializer(serializers.ModelSerializer):
    student = StudentViewSerializer(read_only=True)

    class Meta:
        model = Review
        fields = '__all__'