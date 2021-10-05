from django.db import models
from django.utils.translation import ugettext_lazy as _

from utils.models import BaseModel


class Sesion(BaseModel):
    duration = models.FloatField(default=0.0)

    contract = models.ForeignKey('services.Contract', on_delete=models.CASCADE)
    time_slot = models.ForeignKey(
        'schedules.TimeSlot', on_delete=models.CASCADE)

    def __str__(self) -> str:
        return "{} - {}".format(self.id, self.duration)
