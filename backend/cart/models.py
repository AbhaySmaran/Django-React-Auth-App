from django.db import models
from products.models import Products
from accounts.models import User

# Create your models here.

class Cart(models.Model):
    user = models.ForeignKey(User, on_delete = models.CASCADE)
    product_id = models.ForeignKey(Products, on_delete = models.CASCADE)
    name = models.CharField(max_length=50, blank=True)
    price = models.IntegerField()
    image = models.ImageField()