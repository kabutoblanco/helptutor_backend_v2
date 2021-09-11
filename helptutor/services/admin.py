from django.contrib import admin

from .models import *


admin.site.register([Contract, Aggrement, Nomination, Service, Offer] )
