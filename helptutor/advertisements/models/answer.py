from django.db import models

from utils.models import BaseModel


class Answer(BaseModel):
    likes = models.IntegerField(default=0, verbose_name='Me gusta')
    spam_count = models.IntegerField(default=0, verbose_name='Contador de spam')
    description = models.CharField(max_length=255, blank=True, verbose_name='Descripción')

    advertisement = models.ForeignKey(
        'advertisements.Advertisement', 
        on_delete=models.CASCADE, 
        verbose_name='Anuncio'
    )
    user = models.ForeignKey(
        'users.User', 
        on_delete=models.CASCADE, 
        verbose_name='Usuario'
    )

    class Meta:
        verbose_name = 'Respuesta'
        verbose_name_plural = 'Respuestas'

    def __str__(self):
        return "[{}]".format(self.id)