# Django
from django.db import models

# Utilities
from utils.models import BaseModel


class Moderator(BaseModel):
    """Moderator model."""
    user = models.ForeignKey('users.User', on_delete=models.CASCADE, verbose_name='Moderador')

    class Meta:
        verbose_name = 'Moderador'
        verbose_name_plural = 'Moderadores'

    def __str__(self):
        return "[{}] {}".format(self.id, self.user)