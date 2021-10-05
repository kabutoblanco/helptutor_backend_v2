from django.db import models
from django.utils.translation import ugettext_lazy as _

from utils.models import BaseModel


class Payment(BaseModel):
    TYPE_CHOICES = ((0, _("STAND_BY")), (1, _("ACCEPTED")), (2, _("REJECTED")))

    num_invoice = models.CharField(max_length=255)
    entity = models.CharField(max_length=255)
    payment = models.FloatField(default=0.0)
    status = models.IntegerField(choices=TYPE_CHOICES, default=0)

    user = models.ForeignKey('users.User', on_delete=models.CASCADE)
    contract = models.ForeignKey('services.Contract', on_delete=models.CASCADE)

    def __str__(self) -> str:
        return "{}".format(self.num_invoice)
