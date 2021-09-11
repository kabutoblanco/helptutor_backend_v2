# rest_framework
from rest_framework import generics

# serializers
from helptutor.users.serializers import *


class LoginAPI(generics.CreateAPIView):
    serializer_class = LoginSerializer


class LoginGoogleAPI(generics.CreateAPIView):
    serializer_class = LoginGoogleSerializer