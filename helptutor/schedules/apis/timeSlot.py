# rest_framework
from rest_framework import (generics, viewsets)
from rest_framework.permissions import IsAuthenticated

# models
from helptutor.schedules.models import TimeSlot
from helptutor.users.models import Tutor

# serializers
from helptutor.schedules.serializers import TimeSlotSerialzer


class TimeSlotViewSet(viewsets.ModelViewSet):

    queryset = TimeSlot.objects.filter(is_active=True)
    serializer_class = TimeSlotSerialzer
    permission_classes = [IsAuthenticated]

    def create(self, request, *args, **kwargs):
        request.data['tutor'] = Tutor.objects.get(user=request.user.id).pk
        return super().create(request, *args, **kwargs)


class TutorTimeSlotAPI(generics.ListAPIView):

    serializer_class = TimeSlotSerialzer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return TimeSlot.objects.filter(tutor__user=self.kwargs['pk_user'], is_active=True)