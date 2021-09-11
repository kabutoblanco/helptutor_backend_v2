from django.db import models

from utils.models import BaseModel


class State(BaseModel):
    name = models.CharField(max_length=255, verbose_name='Nombre')
    cod = models.CharField(max_length=12, verbose_name='Código')

    country = models.ForeignKey('places.Country', on_delete=models.CASCADE, verbose_name='País')

    class Meta:
        verbose_name = 'Departamento'
        verbose_name_plural = 'Departamentos'

    def __str__(self):
        return "[{}] {}".format(self.id, self.name)