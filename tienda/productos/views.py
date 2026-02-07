from rest_framework import viewsets
from .models import Marca, Categoria, Reloj, ImagenReloj
from .serializers import MarcaSerializer, CategoriaSerializer, RelojSerializer, ImagenRelojSerializer

class MarcaViewSet(viewsets.ModelViewSet):
    queryset = Marca.objects.all()
    serializer_class = MarcaSerializer

class CategoriaViewSet(viewsets.ModelViewSet):
    queryset = Categoria.objects.all()
    serializer_class = CategoriaSerializer

class RelojViewSet(viewsets.ModelViewSet):
    queryset = Reloj.objects.all()
    serializer_class = RelojSerializer

class ImagenRelojViewSet(viewsets.ModelViewSet):
    queryset = ImagenReloj.objects.all()
    serializer_class = ImagenRelojSerializer
