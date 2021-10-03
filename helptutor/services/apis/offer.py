# rest_framework
from rest_framework import (generics, status, viewsets)
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from django.db import connection

# models
from helptutor.services.models import (Aggrement, Offer)
from helptutor.users.models import Student

# serializers
from helptutor.services.serializers import *


class OfferAPIView(viewsets.ModelViewSet):

    queryset = Offer.objects.filter(is_active=True)
    serializer_class = OfferSerializer
    permission_classes = [IsAuthenticated]

    def create(self, request, *args, **kwargs):
        request.data['student'] = Student.objects.get(user=request.user.id).pk
        return super().create(request, *args, **kwargs)
    
    def partial_update(self, request, *args, **kwargs):
        request.data['student'] = Student.objects.get(user=request.user.id).pk
        return super().partial_update(request, *args, **kwargs)

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        instance.is_active = False
        self.perform_update(instance)
        Aggrement.objects.filter(student=instance.student).update(is_active=False)
        return Response(status=status.HTTP_204_NO_CONTENT)


class StudentOfferAPI(generics.ListAPIView):

    serializer_class = OfferSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Offer.objects.filter(student__user=self.kwargs['pk_user'], is_active=True)


class TutorOfferAPI(generics.ListAPIView):
    """View ListAPIView with serializer include student"""

    serializer_class = OfferViewCustomSerializer
    permission_classes = [IsAuthenticated]

    def list(self, request, *args, **kwargs):
        tutor = str(Tutor.objects.get(user=request.user.id).id)
        query = "SELECT *  FROM  ('services_offer' as so left JOIN 'services_nomination' AS sn ON so.id = sn.offer_id) LEFT JOIN 'services_contract' as sc ON sc.id = sn.contract_ptr_id WHERE so.is_active = 1"
        cursor = connection.cursor()
        cursor.execute(query)
        res = cursor.fetchall()
        resQuery = []
        i = 0
        print('tutor {} - query...'.format(tutor))
        while i < len(res):
            j = i
            while j < len(res):
                if j > i:
                    print("i {} j {} - offer i {} j {} - status i {} j {}".format(i, j, res[i][0], res[j][0], res[i][12], res[j][12]))
                    if res[i][10] == tutor and res[i][12] == 1 and res[i][0] == res[j][0]:
                        if res[j][10] != tutor:
                            print('remove tutor j {}'.format(j))
                            res.pop(j)
                            j -= 1
                        elif res[j][10] == tutor and res[i][12] == 1:
                            print('remove tutor 1 i {} current user'.format(i))
                            res.pop(i)
                            i -= 1
                            break
                    elif res[i][10] != tutor and res[i][0] == res[j][0]:
                        if res[j][10]:
                            print('remove other i {}'.format(i))
                            res.pop(i)
                            i -= 1
                            break
                        elif res[i][0] == res[j][0]:
                            print('remove other j {}'.format(j))
                            res.pop(j)
                            j -= 1
                j += 1
            i += 1
            if len(res) == 0: break
            
        serializer = self.get_serializer(res, many=True)
        return Response(serializer.data)


class OfferNominationAPI(generics.ListAPIView):
    """View ListAPIView with serializer include student"""

    serializer_class = NominationTutorViewSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Nomination.objects.filter(offer=self.kwargs['pk_offer'], is_active=True)
