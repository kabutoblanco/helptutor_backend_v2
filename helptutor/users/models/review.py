# Django
from django.db import models

# Utilities
from utils.models import BaseModel


class Review(BaseModel):
    """Review model."""
    score = models.FloatField(default=0.0, verbose_name='Puntaje')
    comment = models.CharField(max_length=255, verbose_name='Comentario')

    student = models.ForeignKey('users.Student', on_delete=models.CASCADE, verbose_name='Estudiante')
    tutor = models.ForeignKey('users.Tutor', on_delete=models.CASCADE, verbose_name='Tutor')

    class Meta:
        verbose_name = 'Reseña'
        verbose_name_plural = 'Reseñas'
    
    def __str__(self):
        return "[{}] {} {} {}".format(self.id, self.score, self.student, self.tutor)