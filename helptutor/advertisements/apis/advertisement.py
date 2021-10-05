# rest_framework
from helptutor.advertisements.serializers.answer import AnswerViewSerializer
from helptutor.advertisements.models.answer import Answer
from rest_framework import generics, viewsets
from rest_framework.permissions import IsAuthenticated

# models
from helptutor.advertisements.models import Advertisement
from helptutor.users.models import Student

# serializers
from helptutor.advertisements.serializers import AdvertisementSerializer, AdvertisementViewSerializer


class AdvertisementViewSet(viewsets.ModelViewSet):
    """Advertisement view set."""

    queryset = Advertisement.objects.filter(is_active=True).order_by('-date_record', '-date_update')
    permission_classes = [IsAuthenticated]

    def get_serializer_class(self):  
        """Return serializer based on action."""
        if self.action in ['create', 'partial_update']:
            return AdvertisementSerializer
        return AdvertisementViewSerializer

    def create(self, request, *args, **kwargs):
        request.data['student'] = Student.objects.get(user=request.user.id).pk
        return super().create(request, *args, **kwargs)


class AdvertisementAnswerAPI(generics.ListAPIView):

    serializer_class = AnswerViewSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Answer.objects.filter(advertisement=self.kwargs['id'], is_active=True).order_by('-date_record', '-date_update')