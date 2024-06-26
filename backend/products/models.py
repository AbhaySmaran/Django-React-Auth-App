from django.db import models
from accounts.models import User

# Create your models here.
class Products(models.Model):
    id = models.IntegerField(primary_key=True)
    title = models.CharField(max_length = 50, blank=True)
    price = models.IntegerField()
    brand = models.CharField(max_length=50, blank=True)
    description = models.TextField(max_length=200, blank=True)
    category = models.CharField(max_length = 50, blank=True)
    image = models.ImageField(upload_to='product_images/', blank=True)
    rating = models.DecimalField(max_digits=10, decimal_places=1, blank=True, null=True)
    stock = models.IntegerField(blank=True, null=True)
    availabilityStatus = models.CharField(max_length=100, blank=True)



