# rest_framework
from rest_framework import (generics, viewsets)
from rest_framework.permissions import IsAuthenticated

# models
from helptutor.payments.models import Payment

# serializers
from helptutor.payments.serializers import PaymentSerializer


class PaymentViewSet(viewsets.ModelViewSet):

    queryset = Payment.objects.filter(is_active=True)
    serializer_class = PaymentSerializer
    permission_classes = [IsAuthenticated]