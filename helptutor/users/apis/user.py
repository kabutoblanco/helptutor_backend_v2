# rest_framework
from rest_framework import generics
from rest_framework.permissions import IsAuthenticated

# serializers
from helptutor.users.serializers import *


class UserAPI(generics.RetrieveAPIView):

    serializer_class = UserViewSerializer
    permission_classes = [IsAuthenticated]

    def get(self, request, *args, **kwargs):
        response = super().get(request, *args, **kwargs)
        instance = self.get_object()
        is_tutor = Tutor.objects.filter(user=instance).exists()
        is_moderator = Moderator.objects.filter(user=instance).exists()
        is_student = Student.objects.filter(user=instance).exists()
        response.data = dict()
        response.data['roles'] = [is_tutor, is_student, is_moderator]
        response.data['user'] = UserViewSerializer(instance).data
        return response

    def get_object(self):
        return self.request.user


class LoginAPI(generics.CreateAPIView):
    serializer_class = LoginSerializer


class LoginGoogleAPI(generics.CreateAPIView):
    serializer_class = LoginGoogleSerializer