from knox.models import AuthToken

from helptutor.users.models import Tutor, Moderator, Student

def get_response_user(user):
    instance = dict()
    is_tutor = Tutor.objects.filter(user=user).exists()
    is_moderator = Moderator.objects.filter(user=user).exists()
    is_student = Student.objects.filter(user=user).exists()
    instance['roles'] = [is_tutor, is_student, is_moderator]
    instance['user'] = user
    instance['token'] = AuthToken.objects.create(user)[1]
    return instance