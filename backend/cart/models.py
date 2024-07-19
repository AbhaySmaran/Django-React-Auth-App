from django.db import models
from products.models import Products
from accounts.models import User

# Create your models here.

class Cart(models.Model):
    user = models.ForeignKey(User, on_delete = models.CASCADE)
    product = models.ForeignKey(Products, on_delete = models.CASCADE)
    # product_name = models.CharField(max_length=100, blank=True)
    # product_price = models.IntegerField(blank=True,null=True)
    # product_img = models.ImageField(upload_to='cart_products/', blank=True)
    

    
    