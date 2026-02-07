from django.contrib import admin
from .models import Categoria,Marca,Reloj,ImagenReloj
# Register your models here.
admin.site.register(Marca)
admin.site.register(Categoria)
admin.site.register(Reloj)
admin.site.register(ImagenReloj)