from django.db import models
from django.conf import settings

from django.core.mail import EmailMessage
from django.template.loader import render_to_string

from .contract import Contract


class Aggrement(Contract):
    service = models.ForeignKey(
        'services.Service', on_delete=models.CASCADE, verbose_name='Servicio')
    student = models.ForeignKey(
        'users.Student', on_delete=models.CASCADE, verbose_name='Estudiante')

    class Meta:
        verbose_name = 'Acuerdo'
        verbose_name_plural = 'Acuerdos'

    def send_agreement_email(self):
        body = render_to_string('new-agreement.html',
                                {'first_name': self.service.tutor.user.first_name, 'last_name': self.service.tutor.user.last_name, 'service': self.service.title},)
        email_message = EmailMessage(
            subject='Asesoría solicitada',
            body=body,
            from_email=settings.EMAIL_HOST_USER,
            to=[self.service.tutor.user.email],
        )
        email_message.content_subtype = 'html'
        email_message.send()
