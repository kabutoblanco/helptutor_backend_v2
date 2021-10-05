"""Django models utilities."""


#Django
from django.db import models


class BaseModel(models.Model):
    """Base model for all app models."""

    is_active = models.BooleanField(default=True, verbose_name='¿Esta activo?')
    date_record = models.DateTimeField(auto_now_add=True, verbose_name='Fecha de registro')
    date_update = models.DateTimeField(auto_now=True, verbose_name='Fecha de actualización')

    class Meta:
        """Meta options."""
        abstract = True

        get_latest_by = 'date_record'
        ordering = ['date_record', 'date_update']