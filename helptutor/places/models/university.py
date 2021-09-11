from django.db import models

from utils.models import BaseModel


class University(BaseModel):
    name = models.CharField(max_length=255, verbose_name='Nombre')

    city = models.ForeignKey('places.City', on_delete=models.CASCADE, verbose_name='Ciudad')

    class Meta:
        verbose_name = 'Universidad'
        verbose_name_plural = 'Universidades'

    def __str__(self):
        return "[{}] {}".format(self.id, self.name)