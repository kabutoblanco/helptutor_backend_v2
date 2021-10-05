from rest_framework import serializers

from helptutor.sesions.models import Sesion


class SesionSerializer(serializers.ModelSerializer):

    class Meta:
        model = Sesion
        fields = '__all__'