from django.db import models

from utils.models import BaseModel


class Certificate(BaseModel):
    name = models.CharField(max_length=255, verbose_name='Nombre')
    entity = models.CharField(max_length=255, verbose_name='Entidad')
    issue_year = models.DateField(max_length=255, verbose_name='Año de expedición')
    file = models.FileField(upload_to='certificates', verbose_name='Archivo')
    is_validated = models.BooleanField(default=False, verbose_name='¿Es valido?')
    description = models.CharField(max_length=255, blank=True, verbose_name='Descripción')

    knowledge_area_tutor = models.ForeignKey(
        'knowledge_areas.KnowledgeArea_Tutor', 
        on_delete=models.CASCADE, 
        verbose_name='Especialidad tutor'
    )
    moderator = models.ForeignKey(
        'users.Moderator', 
        on_delete=models.CASCADE, 
        verbose_name='Moderador'
    )

    class Meta:
        verbose_name = 'Certificado'
        verbose_name_plural = 'Certificados'

    def __str__(self):
        return "[{}] {}".format(self.id, self.name)