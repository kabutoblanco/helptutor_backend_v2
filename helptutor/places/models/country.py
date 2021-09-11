from django.db import models

from utils.models import BaseModel


class Country(BaseModel):
    name = models.CharField(max_length=255, verbose_name='Nombre')
    cod = models.CharField(max_length=12, verbose_name='Código')

    class Meta:
        verbose_name = 'País'
        verbose_name_plural = 'Paises'

    def __str__(self):
        return "[{}] {}".format(self.id, self.name)