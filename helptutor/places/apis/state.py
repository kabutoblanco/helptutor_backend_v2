# rest_framework
from rest_framework import (generics, viewsets)
from rest_framework.response import Response

# models
from helptutor.places.models import State

# serializers
from helptutor.places.serializers import StateSerializer


class CountryStatesAPIView(generics.ListAPIView):

    queryset = State.objects.all()
    serializer_class = StateSerializer

    def list(self, request, *args, **kwargs):
        queryset = State.objects.filter(country=kwargs['pk'])
        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)


class StateViewSet(viewsets.ModelViewSet):

    queryset = State.objects.filter(is_active=True)
    serializer_class = StateSerializer