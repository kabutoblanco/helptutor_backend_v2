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

    serializer_class = AggrementSerializer
    queryset = Aggrement.objects.filter(is_active=True)
    permission_classes = [IsAuthenticated]

    def get_serializer_class(self):
        if self.action in ['create', 'update', 'partial_update']:
            return AggrementSerializer
        else:
            return AggrementViewSerializer

    def create(self, request, *args, **kwargs):
        request.data['student'] = Student.objects.get(user=request.user.id).pk
        return super().create(request, *args, **kwargs)

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
