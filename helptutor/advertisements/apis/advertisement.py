# rest_framework
from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated

# models
from helptutor.advertisements.models import Advertisement
from helptutor.users.models import Student

# serializers
from helptutor.advertisements.serializers import AdvertisementSerializer


class AdvertisementViewSet(viewsets.ModelViewSet):
    """Advertisement view set."""

    queryset = Advertisement.objects.filter(is_active=True)
    serializer_class = AdvertisementSerializer
    permission_classes = [IsAuthenticated]

    def create(self, request, *args, **kwargs):
        request.data['student'] = Student.objects.get(user=request.user.id).pk
        return super().create(request, *args, **kwargs)