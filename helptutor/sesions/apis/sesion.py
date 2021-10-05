# rest_framework
from rest_framework import (generics, viewsets)
from rest_framework.permissions import IsAuthenticated

# models
from helptutor.sesions.models import Sesion

# serializers
from helptutor.sesions.serializers import SesionSerializer


class SesionViewSet(viewsets.ModelViewSet):

    queryset = Sesion.objects.filter(is_active=True)
    serializer_class = SesionSerializer
    permission_classes = [IsAuthenticated]