# rest_framework
from rest_framework import (generics, viewsets)
from rest_framework.response import Response

# models
from helptutor.places.models import University

# serializers
from helptutor.places.serializers import UniversitySerializer


class CityUniversitiesAPIView(generics.ListAPIView):

    queryset = University.objects.all()
    serializer_class = UniversitySerializer

    def list(self, request, *args, **kwargs):
        queryset = University.objects.filter(city=kwargs['pk'])
        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)


class UniversityViewSet(viewsets.ModelViewSet):

    queryset = University.objects.filter(is_active=True)
    serializer_class = UniversitySerializer