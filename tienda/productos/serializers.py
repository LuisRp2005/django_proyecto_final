from rest_framework import serializers
from .models import Marca, Categoria, Reloj, ImagenReloj

class MarcaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Marca
        fields = '__all__'

class CategoriaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Categoria
        fields = '__all__'

class RelojSerializer(serializers.ModelSerializer):
    class Meta:
        model = Reloj
        fields = '__all__'

class ImagenRelojSerializer(serializers.ModelSerializer):
    class Meta:
        model = ImagenReloj
        fields = '__all__'
