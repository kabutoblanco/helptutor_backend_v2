from django.contrib import admin

from helptutor.knowledge_areas.models import *

admin.site.register([KnowledgeArea, KnowledgeArea_Tutor,
                     KnowledgeArea_Student, Certificate])
