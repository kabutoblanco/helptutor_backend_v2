# Django
from django.db import models

# Utilities
from utils.models import BaseModel


class Notify(BaseModel):
    """Notify model."""
    title = models.CharField(max_length=255, verbose_name='Titulo')
    is_checked = models.BooleanField(default=True, verbose_name='¿Esta revisado?')
    description = models.CharField(max_length=255, verbose_name='Descripción')

    user_to = models.ForeignKey('users.User', related_name='user_to_notify', on_delete=models.CASCADE, verbose_name='Usuario')
    user_from = models.ForeignKey('users.User', related_name='user_from_notify', on_delete=models.CASCADE, verbose_name='Usuario')

    class Meta:
        verbose_name = 'Notificación'
        verbose_name_plural = 'Notificaciones'
    
    def __str__(self):
        return "[{}] {} {}".format(self.id, self.title, self.user)