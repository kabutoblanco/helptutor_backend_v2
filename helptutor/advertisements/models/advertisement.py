from django.db import models

from utils.models import BaseModel


class Advertisement(BaseModel):
    title = models.CharField(max_length=255, verbose_name='Titulo')
    description = models.CharField(max_length=255, blank=True, verbose_name='Descripción')

    student = models.ForeignKey(
        'users.Student', 
        on_delete=models.CASCADE, 
        verbose_name='Estudiante'
    )

    class Meta:
        verbose_name = 'Anuncio'
        verbose_name_plural = 'Anuncios'

    def __str__(self):
        return "[{}] {}".format(self.id, self.title)