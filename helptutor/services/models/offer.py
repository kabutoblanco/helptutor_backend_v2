from django.db import models

from utils.models import BaseModel


class Offer(BaseModel):
    title = models.CharField(max_length=255, verbose_name='Titulo')
    description = models.CharField(max_length=255, blank=True, verbose_name='Descripción')

    student = models.ForeignKey('users.Student', on_delete=models.CASCADE, verbose_name='Estudiante')
    knowledge_area_student = models.ForeignKey('knowledge_areas.KnowledgeArea_Student', on_delete=models.CASCADE, verbose_name='Area de conocimiento')

    class Meta:
        verbose_name = 'Oferta'
        verbose_name_plural = 'Ofertas'

    def __str__(self):
        return "[{}] {}".format(self.id, self.title)