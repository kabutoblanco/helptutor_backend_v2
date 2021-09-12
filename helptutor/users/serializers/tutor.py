# rest_framework
from rest_framework import serializers

# google
from google.oauth2 import id_token
from google.auth.transport import requests

# models
from knox.models import AuthToken
from helptutor.users.models import User, Tutor

# serializers
from .user import (UserViewSerializer, UserCreateSerializer)

# utilities
from utils.string import get_information_google


class TutorViewSerializer(serializers.ModelSerializer):
    user = UserViewSerializer(read_only=True)

    class Meta:
        model = Tutor
        fields = '__all__'


class TutorCreateSerializer(serializers.ModelSerializer):
    user = UserCreateSerializer(write_only=True)

    def validate_user(self, value):
        email = value.pop('email')
        user, created = User.objects.get_or_create(
            email=email, defaults={**value}
        )
        if created:
            user.set_password(user.password)
            user.save()
        self.context['user'] = user

    def validate(self, attrs):
        verify_tutor_exist(self.context['user'].email)        
        return super().validate(attrs)

    def create(self, validated_data):
        user = validated_data.pop('user')
        user = self.context['user']
        tutor = Tutor.objects.create(**validated_data, user=user)
        user.send_registration_email('tutor')

        user = tutor.user
        instance = dict()
        instance['user'] = user
        instance['token'] = AuthToken.objects.create(user)[1]

        return instance

    def to_representation(self, instance):
        instance['user'] = UserViewSerializer(instance['user']).data
        return instance

    class Meta:
        model = Tutor
        fields = '__all__'


class TutorUpdateSerializer(serializers.ModelSerializer):
    user = UserViewSerializer(read_only=True)

    def update(self, instance, validated_data):
        pk_user = self.context['view'].kwargs['pk']
        # user = self.context['request'].user
        instance = Tutor.objects.get(user=pk_user)
        return super().update(instance, validated_data)

    def to_representation(self, instance):
        pk_user = self.context['view'].kwargs['pk']
        instance = TutorViewSerializer(Tutor.objects.get(user=pk_user)).data
        return instance

    class Meta:
        model = Tutor
        fields = '__all__'


class TutorGoogleCreateSerializer(serializers.Serializer):
    token = serializers.CharField()

    def validate_token(self, data):
        """Validate token Google"""
        token = data
        CLIENT_ID = "581408483289-vlrheiceitim0evek4mrjnakqm5v07m7.apps.googleusercontent.com"
        try:
            idinfo = id_token.verify_oauth2_token(token, requests.Request(), CLIENT_ID)
            user = get_information_google(dict(), idinfo)
            # Crea un nuevo usuario o lo recupera si ya existe
            user, created = User.objects.get_or_create(
                email=user['username'], defaults={**user}
            )        
            if created:
                user.set_password(user.password)
                user.save()
            self.context['user'] = user            
            verify_tutor_exist(user.email)
            return data
        except ValueError:
            raise serializers.ValidationError('Error auth GoogleAPI')
        except User.DoesNotExist:
            raise serializers.ValidationError('Credenciales incorrectas')

    def create(self, validated_data):
        validated_data.pop('token')
        validated_data['user'] = self.context['user']

        tutor = Tutor.objects.create(**validated_data)
        tutor.save()

        user = self.context['user']
        user.send_registration_email('tutor')
        instance = dict()
        instance['user'] = user
        instance['token'] = AuthToken.objects.create(user)[1]

        return instance

    def to_representation(self, value):
        value['user'] = UserViewSerializer(value['user']).data
        return value


def verify_tutor_exist(email):
    is_exist = Tutor.objects.filter(
        user__email=email).exists()
    if is_exist:
        raise serializers.ValidationError('Ya existe un tutor con este correo')