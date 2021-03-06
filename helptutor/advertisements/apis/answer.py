# rest_framework
from django.views import generic
from rest_framework import viewsets, generics
from rest_framework.permissions import IsAuthenticated

# models
from helptutor.advertisements.models import Answer

# serializers
from helptutor.advertisements.serializers import AnswerSerializer, AnswerViewSerializer


class AnswerViewSet(viewsets.ModelViewSet):
    """Answer view set."""

    queryset = Answer.objects.filter(is_active=True).order_by('-date_record', '-date_update')
    permission_classes = [IsAuthenticated]

    def get_serializer_class(self):
        """Return serializer based on action."""
        if self.action in ['create', 'partial_update']:
            return AnswerSerializer
        return AnswerViewSerializer

    def create(self, request, *args, **kwargs):
        request.data['user'] = request.user.id
        return super().create(request, *args, **kwargs)