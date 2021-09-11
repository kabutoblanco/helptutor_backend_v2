# rest_framework
from rest_framework import viewsets

# models
from helptutor.places.models import Country

# serializers
from helptutor.places.serializers import CountrySerializer


class CountryViewSet(viewsets.ModelViewSet):

    queryset = Country.objects.filter(is_active=True)
    serializer_class = CountrySerializer