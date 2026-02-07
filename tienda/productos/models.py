from django.db import models

# Marca del reloj (ej: Rolex, Casio, Omega)
class Marca(models.Model):
    nombre = models.CharField(max_length=100, unique=True)

    def __str__(self):
        return self.nombre


# Categoría del reloj (ej: Deportivo, Lujo, Smartwatch)
class Categoria(models.Model):
    nombre = models.CharField(max_length=100, unique=True)

    def __str__(self):
        return self.nombre


# Modelo principal de Reloj
class Reloj(models.Model):
    nombre = models.CharField(max_length=200)
    descripcion = models.TextField(blank=True, null=True)
    precio = models.DecimalField(max_digits=10, decimal_places=2)
    stock = models.PositiveIntegerField(default=0)

    marca = models.ForeignKey(Marca, on_delete=models.CASCADE, related_name="relojes")
    categoria = models.ForeignKey(Categoria, on_delete=models.SET_NULL, null=True, related_name="relojes")

    fecha_lanzamiento = models.DateField(blank=True, null=True)
    garantia_meses = models.PositiveIntegerField(default=12)

    def __str__(self):
        return f"{self.marca.nombre} - {self.nombre}"


# Imágenes de cada reloj
class ImagenReloj(models.Model):
    reloj = models.ForeignKey(Reloj, on_delete=models.CASCADE, related_name="imagenes")
    imagen = models.ImageField(upload_to="relojes/", null=True, blank=True)

    def __str__(self):
        return f"Imagen de {self.reloj.nombre}"
