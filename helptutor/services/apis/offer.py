# rest_framework
from rest_framework import (generics, status, viewsets)
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

# models
from helptutor.services.models import (Aggrement, Offer)
from helptutor.users.models import Student

# serializers
from helptutor.services.serializers import *


class OfferAPIView(viewsets.ModelViewSet):

    queryset = Offer.objects.filter(is_active=True)
    serializer_class = OfferSerializer
    permission_classes = [IsAuthenticated]

    def create(self, request, *args, **kwargs):
        request.data['student'] = Student.objects.get(user=request.user.id).pk
        return super().create(request, *args, **kwargs)
    
    def partial_update(self, request, *args, **kwargs):
        request.data['student'] = Student.objects.get(user=request.user.id).pk
        return super().partial_update(request, *args, **kwargs)

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        instance.is_active = False
        self.perform_update(instance)
        Aggrement.objects.filter(student=instance.student).update(is_active=False)
        return Response(status=status.HTTP_204_NO_CONTENT)


class StudentOfferAPI(generics.ListAPIView):

    serializer_class = OfferSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Offer.objects.filter(student__user=self.kwargs['pk_user'], is_active=True)


class TutorOfferAPI(generics.ListAPIView):
    """View ListAPIView with serializer include student"""

    serializer_class = OfferViewSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Offer.objects.filter(is_active=True)


class OfferNominationAPI(generics.ListAPIView):
    """View ListAPIView with serializer include student"""

    serializer_class = NominationTutorViewSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Nomination.objects.filter(offer=self.kwargs['pk_offer'], is_active=True)
