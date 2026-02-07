from django.urls import path, include
from rest_framework import routers
from django.urls import path, include
from .views import MarcaViewSet, CategoriaViewSet, RelojViewSet, ImagenRelojViewSet

router = routers.DefaultRouter()
router.register(r'marcas', MarcaViewSet)
router.register(r'categorias', CategoriaViewSet)
router.register(r'relojes', RelojViewSet)
router.register(r'imagenes-relojes', ImagenRelojViewSet)

urlpatterns = [
    path('', include(router.urls)),
]

