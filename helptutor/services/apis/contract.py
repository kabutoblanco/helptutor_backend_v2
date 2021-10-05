# rest_framework
from rest_framework import (generics, status, viewsets)
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

# models
from helptutor.services.models import Nomination
from helptutor.users.models import Tutor

# serializers
from helptutor.services.serializers import *


class StudentContractAPIView(generics.ListAPIView):

    serializer_class = ContractSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        student = Student.objects.get(user=self.request.user.id)
        aggrements = Aggrement.objects.filter(student=student, is_active=True)
        nominations = Nomination.objects.filter(offer__student=student, is_active=True)
        contracts = []
        print(aggrements)
        return Contract.objects.all()