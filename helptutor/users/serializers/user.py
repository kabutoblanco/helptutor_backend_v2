# django
from django.contrib.auth import authenticate
from django.contrib.auth.validators import UnicodeUsernameValidator

# rest_framework
from rest_framework import serializers

# google
from google.oauth2 import id_token
from google.auth.transport import requests

# models
from knox.models import AuthToken
from helptutor.users.models import (User, Tutor, Student, Moderator)


class UserViewSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        exclude = ['groups', 'password', 'user_permissions']

# Solo se usa para crear un usuario desde Tutor o Estudiante
# de otra manera no valida que exista un mismo usuario con el mismo username o email
class UserCreateSerializer(serializers.ModelSerializer):
    username = serializers.CharField(validators=[UnicodeUsernameValidator()])
    email = serializers.EmailField(validators=[])

    class Meta:
        model = User
        fields = '__all__'


class UserUpdateSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        exclude = ['username', 'email', 'password']


class LoginSerializer(serializers.Serializer):
    email = serializers.CharField()
    password = serializers.CharField()

    def validate(self, data):
        user = authenticate(**data)
        if user and user.is_active:
            self.context['user'] = user
            return data
        raise serializers.ValidationError("Credenciales incorrectas")

    def create(self, validated_data):
        instance = dict()
        user = self.context['user']
        is_tutor = Tutor.objects.filter(user=user).exists()
        is_moderator = Moderator.objects.filter(user=user).exists()
        is_student = Student.objects.filter(user=user).exists()
        instance['roles'] = [is_tutor, is_student, is_moderator] 
        instance['user'] = user
        instance['token'] = AuthToken.objects.create(user)[1]
        return instance
    
    def to_representation(self, value):
        value['user'] = UserViewSerializer(value['user']).data
        return value


class LoginSerializer(serializers.Serializer):
    email = serializers.CharField()
    password = serializers.CharField()

    def validate(self, data):
        user = authenticate(**data)
        if user and user.is_active:
            self.context['user'] = user
            return data
        raise serializers.ValidationError("Credenciales incorrectas")

    def create(self, validated_data):
        instance = dict()
        user = self.context['user']
        is_tutor = Tutor.objects.filter(user=user).exists()
        is_moderator = Moderator.objects.filter(user=user).exists()
        is_student = Student.objects.filter(user=user).exists()
        instance['roles'] = [is_tutor, is_student, is_moderator] 
        instance['user'] = user
        instance['token'] = AuthToken.objects.create(user)[1]
        return instance
    
    def to_representation(self, value):
        value['user'] = UserViewSerializer(value['user']).data
        return value


class LoginGoogleSerializer(serializers.Serializer):
    token = serializers.CharField()

    def validate_token(self, data):
        """Validate token Google"""
        token = data
        CLIENT_ID = "581408483289-vlrheiceitim0evek4mrjnakqm5v07m7.apps.googleusercontent.com"
        try:
            idinfo = id_token.verify_oauth2_token(token, requests.Request(), CLIENT_ID)
            user = User.objects.get(email=idinfo['email'])
            self.context['user'] = user
        except ValueError:
            raise serializers.ValidationError('Error auth GoogleAPI')
        except User.DoesNotExist:
            raise serializers.ValidationError('Credenciales incorrectas')
        return data
    
    def create(self, validated_data):
        instance = dict()
        user = self.context['user']
        is_tutor = Tutor.objects.filter(user=user).exists()
        is_moderator = Moderator.objects.filter(user=user).exists()
        is_student = Student.objects.filter(user=user).exists()
        instance['roles'] = [is_tutor, is_student, is_moderator]
        instance['user'] = user
        instance['token'] = AuthToken.objects.create(user)[1]
        return instance
    
    def to_representation(self, value):
        value['user'] = UserViewSerializer(value['user']).data
        return value


