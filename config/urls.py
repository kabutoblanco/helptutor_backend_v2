from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin
from django.urls import (include, path)


urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include('helptutor.advertisements.urls')),
    path('', include('helptutor.knowledge_areas.urls')),
    # path('', include('helptutor.payments.urls')),
    path('', include('helptutor.places.urls')),
    path('', include('helptutor.schedules.urls')),
    path('', include('helptutor.services.urls')),
    # path('', include('helptutor.sesions.urls')),
    path('', include('helptutor.users.urls')),
    path('', include('helptutor.frontend.urls')),
]

urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
