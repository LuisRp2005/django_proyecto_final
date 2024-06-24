# Create your models here.
from django.db import models

class Categoria(models.Model):
    nombre = models.CharField(max_length=50)

    def __str__(self):
        return self.nombre

class Usuario(models.Model):
    nombre = models.CharField(max_length=100)
    apellidos = models.CharField(max_length=100)
    gmail = models.EmailField(max_length=50)
    contrasena = models.CharField(max_length=255)
    rol = models.IntegerField(default=1)

    def __str__(self):
        return f"{self.nombre} {self.apellidos} (Email: {self.gmail})"



class Producto(models.Model):
    nombre = models.CharField(max_length=200)
    descripcion = models.TextField()
    precio = models.DecimalField(max_digits=10, decimal_places=2)
    categoria = models.ForeignKey(Categoria, on_delete=models.CASCADE)

    def __str__(self):
        return self.nombre
    
class Imagen(models.Model):
    producto = models.ForeignKey(Producto, on_delete=models.CASCADE, related_name='imagenes')
    imagen = models.ImageField(upload_to="productos/", null=True)

    def __str__(self):
        return f"Imagen de {self.producto.nombre}"