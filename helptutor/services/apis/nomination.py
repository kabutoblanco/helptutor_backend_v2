# rest_framework
from rest_framework import (generics, status, viewsets)
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

# models
from helptutor.services.models import Nomination
from helptutor.users.models import Tutor
from helptutor.schedules.models import TimeSlot

# serializers
from helptutor.services.serializers import *
from helptutor.payments.serializers import PaymentSerializer
from helptutor.sesions.serializers import SesionSerializer


class NominationAPIView(viewsets.ModelViewSet):

    queryset = Nomination.objects.filter(is_active=True)
    serializer_class = NominationSerializer
    permission_classes = [IsAuthenticated]

    def create(self, request, *args, **kwargs):
        request.data['tutor'] = Tutor.objects.get(user=request.user.id).pk
        request.data["is_accepted_tutor"] = True
        return super().create(request, *args, **kwargs)

    def partial_update(self, request, *args, **kwargs):
        time_slot = request.data.pop("time_slot")
        payment = request.data.pop("payment")
        request.data.update(request.data.pop("nomination"))
        request.data["is_accepted_student"] = True
        response =  super().partial_update(request, *args, **kwargs)
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
        return response

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        instance.is_active = False
        self.perform_update(instance)
        return Response(status=status.HTTP_204_NO_CONTENT)


class TutorNominationAPI(generics.ListAPIView):

    serializer_class = NominationSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Nomination.objects.filter(tutor__user=self.kwargs['pk_user'], is_active=True)


class NominationTutorAPI(generics.ListAPIView):

    serializer_class = NominationTutorViewSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Nomination.objects.filter(offer=self.kwargs['pk_offer'], is_active=True).order_by('-date_update')