from rest_framework import serializers

from helptutor.schedules.models import TimeSlot


class TimeSlotSerialzer(serializers.ModelSerializer):

    class Meta:
        model = TimeSlot
        fields = '__all__'
