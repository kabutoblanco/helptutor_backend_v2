# Django
from django.db import models

# Utilities
from utils.models import BaseModel


class Tutor(BaseModel):
    """Tutor model."""  
    score = models.FloatField(default=0.0, verbose_name='Puntuación')
    methodology = models.CharField(max_length=120, blank=True, verbose_name='Metodología')
    trajectory = models.CharField(max_length=120, blank=True, verbose_name='Trajectoria')
    skills = models.CharField(max_length=120, blank=True, verbose_name='Habilidades')

    user = models.ForeignKey('users.User', on_delete=models.CASCADE, verbose_name='Usuario')

    class Meta:
        verbose_name = 'Tutor'
        verbose_name_plural = 'Tutores'

    def __str__(self):
        return "[{}] {}".format(self.id, self.user)