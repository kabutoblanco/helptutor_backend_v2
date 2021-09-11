# Django
from django.db import models
from django.conf import settings
from django.contrib.auth.models import AbstractUser
from django.utils.translation import ugettext_lazy as _

from django.core.mail import EmailMessage
from django.template.loader import render_to_string

# Utilities
from utils.models import BaseModel


class User(BaseModel, AbstractUser):
    """User model."""
    email = models.EmailField(max_length=254, unique=True, verbose_name='Correo')
    photo = models.CharField(max_length=254, blank=True, verbose_name='Foto')
    telephone = models.CharField(max_length=64, blank=True, verbose_name='Telefono')
    birthday = models.DateField(null=True, blank=True, verbose_name='Cumpleaños')
    interest = models.CharField(max_length=254, blank=True, verbose_name='Intereses')
    is_verified = models.BooleanField(default=False, verbose_name='¿Esta verificado?')
    is_completed = models.BooleanField(default=False, verbose_name='¿Esta completo?')
    description = models.CharField(max_length=120, blank=True, verbose_name='Descripción')

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username', 'first_name', 'last_name']

    university = models.ForeignKey('places.University', on_delete=models.CASCADE, null=True, blank=True, verbose_name='Universidad')
    city = models.ForeignKey('places.City', on_delete=models.CASCADE, null=True, blank=True, verbose_name='Ciudad')

    is_active = models.BooleanField(
        _('active'),
        default=True,
        help_text=_(
            'Designates whether this user should be treated as active. '
            'Unselect this instead of deleting accounts.'
        ),
    )

    def send_registration_email(self, rol):
        body = render_to_string('new-user.html',
            {'first_name': self.first_name, 'last_name': self.last_name, 'rol': rol},)
        email_message = EmailMessage(
            subject='Registro Helptutor',
            body=body,
            from_email=settings.EMAIL_HOST_USER,
            to=[self.email],
        )
        email_message.content_subtype = 'html'
        email_message.send() 

    def __str__(self):
        return "[{}] {}".format(self.id, self.email)