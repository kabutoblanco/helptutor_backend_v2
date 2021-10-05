from django.db import transaction

# rest_framework
from rest_framework import (generics, status, viewsets)
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

# models
from helptutor.services.models import Nomination
from helptutor.users.models import Student
from helptutor.schedules.models import TimeSlot

# serializers
from helptutor.services.serializers import *
from helptutor.payments.serializers import PaymentSerializer
from helptutor.sesions.serializers import SesionSerializer


class AggrementAPIView(viewsets.ModelViewSet):

    serializer_class = AggrementSerializer
    queryset = Aggrement.objects.filter(is_active=True)
    permission_classes = [IsAuthenticated]

    def get_serializer_class(self):
        if self.action in ['create', 'update', 'partial_update']:
            return AggrementSerializer
        else:
            return AggrementViewSerializer

    @transaction.atomic
    def create(self, request, *args, **kwargs):
        student = Student.objects.get(user=request.user.id)
        time_slot = request.data.pop("time_slot")
        payment = request.data.pop("payment")
        request.data.update(request.data.pop("aggrement"))
        request.data["student"] = student.id
        response =  super().create(request, *args, **kwargs)
        contract = response.data
        sesion = {"contract": contract["id"], "time_slot": time_slot, "duration": 1}
        # Update time slot
        time_slot_instance = TimeSlot.objects.get(pk=time_slot)
        time_slot_instance.is_busy = True
        time_slot_instance.save()
        # Save payment
        payment["num_invoice"] = "asd"
        payment["contract"] = contract["id"]
        payment["payment"] = contract["price"]
        payment["user"] = request.user.id
        serializer_payment = PaymentSerializer(data=payment)
        serializer_payment.is_valid(raise_exception=True)
        serializer_payment.save()
        # Save sesion
        serializer_sesion = SesionSerializer(data=sesion)
        serializer_sesion.is_valid(raise_exception=True)
        serializer_sesion.save()        
        Aggrement.objects.get(pk=contract["id"]).send_agreement_email()
        return response

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        instance.is_active = False
        self.perform_update(instance)
        return Response(status=status.HTTP_204_NO_CONTENT)


class StudentAggrementAPI(generics.ListAPIView):

    serializer_class = AggrementViewSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Aggrement.objects.filter(student__user=self.kwargs['pk_user'], is_active=True)


class TutorAggrementAPI(generics.ListAPIView):

    serializer_class = AggrementViewSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Aggrement.objects.filter(service__tutor__user=self.kwargs['pk_user'], is_active=True)
