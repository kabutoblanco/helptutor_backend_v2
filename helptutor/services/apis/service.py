# rest_framework
from rest_framework import (generics, status, viewsets)
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

# models
from helptutor.services.models import (Aggrement, Service)
from helptutor.users.models import Tutor

# serializers
from helptutor.services.serializers import ServiceSerializer


class ServiceAPIView(viewsets.ModelViewSet):

    serializer_class = ServiceSerializer
    queryset = Service.objects.filter(is_active=True)
    permission_classes = [IsAuthenticated]

    def create(self, request, *args, **kwargs):
        request.data['tutor'] = Tutor.objects.get(user=request.user.id).pk
        return super().create(request, *args, **kwargs)

    def partial_update(self, request, *args, **kwargs):
        request.data['tutor'] = Tutor.objects.get(user=request.user.id).pk
        return super().partial_update(request, *args, **kwargs)

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        instance.is_active = False
        self.perform_update(instance)
        Aggrement.objects.filter(service=instance.pk).update(is_active=False)
        return Response(status=status.HTTP_204_NO_CONTENT)


class TutorServiceAPI(generics.ListAPIView):

    serializer_class = ServiceSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Service.objects.filter(tutor__user=self.kwargs['pk_user'], is_active=True)
      