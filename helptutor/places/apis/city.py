from rest_framework import (generics, viewsets)
from rest_framework.response import Response

# models
from helptutor.places.models import (City, State)

# serializers
from helptutor.places.serializers import CitySerializer

    
class StateCitiesAPIView(generics.ListAPIView):

    queryset = State.objects.all()
    serializer_class = CitySerializer

    def list(self, request, *args, **kwargs):
        queryset = City.objects.filter(state=kwargs['pk'])
        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)


class CityViewSet(viewsets.ModelViewSet):

    queryset = City.objects.filter(is_active=True)
    serializer_class = CitySerializer