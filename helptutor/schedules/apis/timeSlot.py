# rest_framework
from rest_framework import (generics, viewsets)
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

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
        tutor = Tutor.objects.get(user=request.user.id).pk
        time_slots = request.data['time_slots']
        for time_slot in time_slots:
            time_slot['tutor'] = tutor
            serializer = self.get_serializer(data=time_slot)
            serializer.is_valid(raise_exception=True)
            serializer.save()
        return Response(status=status.HTTP_201_CREATED)


class TutorTimeSlotAPI(generics.ListAPIView):

    serializer_class = TimeSlotSerialzer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return TimeSlot.objects.filter(tutor__user=self.kwargs['pk_user'], is_active=True)
