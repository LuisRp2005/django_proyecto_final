from django.contrib import admin
from .models import Categoria,Imagen,Producto,Usuario
# Register your models here.
admin.site.register(Usuario)


admin.site.register(Categoria)

admin.site.register(Imagen)

admin.site.register(Producto)
