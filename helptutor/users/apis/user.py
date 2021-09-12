# rest_framework
from rest_framework import generics
from rest_framework.permissions import IsAuthenticated

# serializers
from helptutor.users.serializers import *


class UserAPI(generics.RetrieveAPIView):

    serializer_class = UserViewSerializer
    permission_classes = [IsAuthenticated]

    def get_object(self):
        return self.request.user


class LoginAPI(generics.CreateAPIView):
    serializer_class = LoginSerializer


class LoginGoogleAPI(generics.CreateAPIView):
    serializer_class = LoginGoogleSerializer