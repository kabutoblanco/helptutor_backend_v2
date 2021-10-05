from rest_framework.test import APITestCase, APIClient
from rest_framework import status
from model_mommy import mommy
from knox.models import AuthToken

from helptutor.users.models import User, Tutor, Student, Review


class TestApiTutor(APITestCase):

    def setUp(self):
        self.client = APIClient()
        self.url = "/api/tutor/"
        self.tutor = mommy.make(Tutor)

    def test_create_tutor(self):
        # data
        data = {
            'user': {
                'first_name': 'Andres',
                'last_name': 'Meneses',
                'email': 'andres@unicauca.edu.co',
                'password': 'oracle'
            }
        }

        # process
        response = self.client.post(self.url, data=data, format='json')

        # assert
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_update_tutor(self):
        # header
        token = AuthToken.objects.create(self.tutor.user)[1]
        path = self.url + str(self.tutor.user.id) + "/"

        headers = {
            'Authorization': "Token " + token,
            'Content-Type': 'application/json'
        },

        self.client.credentials(HTTP_AUTHORIZATION='Token ' + token)

        # data
        data = {
            'user': {
                'first_name': 'Andres',
                'last_name': 'Meneses'
            },
            'methodology': 'mi metodologia'
        }

        # process
        response = self.client.patch(
            path, data=data, format='json', headers=headers)

        result = response.json()

        # assert
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(result["methodology"], 'mi metodologia')


class TestApiStudent(APITestCase):

    def setUp(self):
        self.client = APIClient()
        self.url = "/api/student/"
        self.student = mommy.make(Student)

    def test_create_student(self):
        # data
        data = {
            'user': {
                'first_name': 'Camila',
                'last_name': 'Pardo',
                'email': 'camila@unicauca.edu.co',
                'password': 'oracle'
            }
        }

        # process
        response = self.client.post(self.url, data=data, format='json')

        # assert
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_update_student(self):
        # header
        token = AuthToken.objects.create(self.student.user)[1]
        path = self.url + str(self.student.user.id) + "/"

        headers = {
            'Authorization': "Token " + token,
            'Content-Type': 'application/json'
        },

        self.client.credentials(HTTP_AUTHORIZATION='Token ' + token)

        # data
        data = {
            'user': {
                'first_name': 'Camila',
                'last_name': 'Pardo',
                'birthday': '2020-12-12'
            },
        }

        # process
        response = self.client.patch(
            path, data=data, format='json', headers=headers)

        result = response.json()

        # assert
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(result["user"]["birthday"], data["user"]["birthday"])


class TestApiReview(APITestCase):

    def setUp(self):
        self.client = APIClient()
        self.url = "/api/review/"
        self.review = mommy.make(Review)

    def test_create_review(self):
        # header
        student = Student.objects.all()[0]
        token = AuthToken.objects.create(student.user)[1]

        headers = {
            'Authorization': "Token " + token,
            'Content-Type': 'application/json'
        },

        self.client.credentials(HTTP_AUTHORIZATION='Token ' + token)

        # data
        tutor = Tutor.objects.all()[0]

        data = {
            'student': student.id,
            'tutor': tutor.id,
            'score': 4,
            'comment': 'Muy divertido'
        }

        print(data)

        # process
        response = self.client.post(
            self.url, data=data, format='json', headers=headers)

        # assert
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_update_review(self):
        # header
        token = AuthToken.objects.create(self.student.user)[1]
        path = self.url + str(self.student.user.id) + "/"

        headers = {
            'Authorization': "Token " + token,
            'Content-Type': 'application/json'
        },

        self.client.credentials(HTTP_AUTHORIZATION='Token ' + token)

        # data
        data = {
            'user': {
                'first_name': 'Andres',
                'last_name': 'Meneses',
                'birthday': '2020-12-12'
            },
        }

        # process
        response = self.client.patch(
            path, data=data, format='json', headers=headers)

        result = response.json()

        # assert
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(result["user"]["birthday"], data["user"]["birthday"])
