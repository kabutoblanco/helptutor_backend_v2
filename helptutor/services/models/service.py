from django.db import models

from utils.models import BaseModel


class Service(BaseModel):
    title = models.CharField(max_length=255, verbose_name='Titulo')
    price = models.FloatField(default=0.0, verbose_name='Precio')
    description = models.CharField(max_length=255, blank=True, verbose_name='Descripción')

    tutor = models.ForeignKey('users.Tutor', on_delete=models.CASCADE, verbose_name='Tutor')
    knowledge_area_tutor = models.ForeignKey('knowledge_areas.KnowledgeArea_Tutor', on_delete=models.CASCADE, verbose_name='Area de conocimiento')

    class Meta:
        verbose_name = 'Servicio'
        verbose_name_plural = 'Servicios'

    def __str__(self):
        return "[{}] {}".format(self.id, self.title)