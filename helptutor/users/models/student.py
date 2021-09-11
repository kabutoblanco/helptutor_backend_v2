# Django
from django.db import models

# Utilities
from utils.models import BaseModel


class Student(BaseModel):
    """Student model."""
    user = models.ForeignKey('users.User', on_delete=models.CASCADE, verbose_name='Usuario')

    class Meta:
        verbose_name = 'Estudiante'
        verbose_name_plural = 'Estudiantes'
    
    def __str__(self):
        return "[{}] {}".format(self.id, self.user)