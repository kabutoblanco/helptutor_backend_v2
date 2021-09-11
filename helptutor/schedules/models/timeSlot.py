from django.db import models

from utils.models import BaseModel


class TimeSlot(BaseModel):
    day = models.DateField(verbose_name='Dia')
    start_time = models.TimeField(verbose_name='Hora inicio')
    end_time = models.TimeField(verbose_name='Hora fin')
    is_editabled = models.BooleanField(default=True, verbose_name='¿Es editable?')
    is_busy = models.BooleanField(default=False, verbose_name='¿Esta ocupado?')
    description = models.CharField(max_length=255, blank=True, verbose_name='Descripción')

    tutor = models.ForeignKey('users.Tutor', on_delete=models.CASCADE)

    class Meta:
        verbose_name = 'Franja horaria'
        verbose_name_plural = 'Franjas horarias'

    def __str__(self):
        return "[{}]".format(self.id)