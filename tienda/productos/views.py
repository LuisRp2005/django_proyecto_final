from rest_framework import viewsets, filters
from .models import Categoria, Usuario, Producto, Imagen
from .serializers import CategoriaSerializer, UsuarioSerializer, ProductoSerializer, ImagenSerializer

class CategoriaViewSet(viewsets.ModelViewSet):
    queryset = Categoria.objects.all()
    serializer_class = CategoriaSerializer

class UsuarioViewSet(viewsets.ModelViewSet):
    queryset = Usuario.objects.all()
    serializer_class = UsuarioSerializer

class ProductoViewSet(viewsets.ModelViewSet):
    queryset = Producto.objects.all()
    serializer_class = ProductoSerializer
    filter_backends = [filters.SearchFilter] 
    search_fields = ['nombre', 'descripcion'] 

    def get_queryset(self):
        categoria_id = self.request.query_params.get('categoria', None)
        queryset = self.queryset
        if categoria_id:
            queryset = queryset.filter(categoria__id=categoria_id)
        return queryset

class ImagenViewSet(viewsets.ModelViewSet):
    queryset = Imagen.objects.all()
    serializer_class = ImagenSerializer
