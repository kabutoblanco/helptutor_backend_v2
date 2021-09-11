# rest_framework
from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated

# models
from helptutor.advertisements.models import Answer

# serializers
from helptutor.advertisements.serializers import AnswerSerializer


class AnswerViewSet(viewsets.ModelViewSet):
    """Answer view set."""

    queryset = Answer.objects.filter(is_active=True)
    serializer_class = AnswerSerializer
    permission_classes = [IsAuthenticated]

    def create(self, request, *args, **kwargs):
        request.data['user'] = request.user.id
        return super().create(request, *args, **kwargs)