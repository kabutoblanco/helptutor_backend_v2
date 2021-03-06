from rest_framework import serializers

from helptutor.services.models import Offer
from helptutor.services.models.nomination import Nomination
from helptutor.services.serializers.nomination import NominationSerializer
from helptutor.users.models import Tutor, Student

from helptutor.users.serializers import StudentViewSerializer


class OfferSerializer(serializers.ModelSerializer):
    class Meta:
        model = Offer
        fields = '__all__'


class OfferViewSerializer(serializers.ModelSerializer):
    student = StudentViewSerializer(read_only=True)

    class Meta:
        model = Offer
        fields = '__all__'


class OfferStudentViewSerializer(serializers.ModelSerializer):
    student = StudentViewSerializer(read_only=True)
    count_nominations = serializers.SerializerMethodField()

    def get_count_nominations(self, obj):
        user = self.context['view'].kwargs['pk_user']
        nominations = Nomination.objects.filter(
            offer=obj.pk, offer__student__user=user, is_active=True)
        count = nominations.count()
        return count

    class Meta:
        model = Offer
        fields = '__all__'


class OfferViewCustomSerializer(serializers.Serializer):
    id = serializers.SerializerMethodField()
    title = serializers.SerializerMethodField()
    price = serializers.SerializerMethodField()
    description = serializers.SerializerMethodField()
    student = serializers.SerializerMethodField()
    nomination = serializers.SerializerMethodField()
    tutor_id = serializers.SerializerMethodField()
    date_record = serializers.SerializerMethodField()
    date_update = serializers.SerializerMethodField()

    def validate(self, attrs):
        print('validando')
        return super().validate(attrs)

    def get_id(self, obj):
        return obj[0]

    def get_title(self, obj):
        return obj[4]

    def get_price(self, obj):
        return obj[17]

    def get_description(self, obj):
        return obj[5]

    def get_student(self, obj):
        return StudentViewSerializer(Student.objects.get(pk=obj[6])).data

    def get_nomination(self, obj):
        try:
            return NominationSerializer(Nomination.objects.get(pk=obj[11])).data
        except Nomination.DoesNotExist:
            return None

    def get_tutor_id(self, obj):
        try:
            return Tutor.objects.get(pk=obj[10]).user_id
        except Tutor.DoesNotExist:
            return None

    def get_date_record(self, obj):
        return obj[2]

    def get_date_update(self, obj):
        return obj[3]
