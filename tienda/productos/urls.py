from django.urls import path, include
from rest_framework.routers import DefaultRouter # type: ignore
from .views import CategoriaViewSet, UsuarioViewSet, ProductoViewSet, ImagenViewSet

router = DefaultRouter()
router.register(r'categorias', CategoriaViewSet)
router.register(r'usuarios', UsuarioViewSet)
router.register(r'productos', ProductoViewSet)
router.register(r'imagenes', ImagenViewSet)

urlpatterns = [
    path('api/', include(router.urls)),
]
