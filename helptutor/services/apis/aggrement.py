# rest_framework
from rest_framework import (generics, status, viewsets)
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

# models
from helptutor.services.models import Nomination
from helptutor.users.models import Student

# serializers
from helptutor.services.serializers import *


class AggrementAPIView(viewsets.ModelViewSet):

    serializer_class = NominationSerializer
    queryset = Nomination.objects.filter(is_active=True)
    permission_classes = [IsAuthenticated]

    def create(self, request, *args, **kwargs):
        request.data['student'] = Student.objects.get(user=request.user.id).pk
        return super().create(request, *args, **kwargs)

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        instance.is_active = False
        self.perform_update(instance)
        return Response(status=status.HTTP_204_NO_CONTENT)


class StudentAggrementAPI(generics.ListAPIView):

    serializer_class = AggrementSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Aggrement.objects.filter(student__user=self.kwargs['pk_user'], is_active=True)
        