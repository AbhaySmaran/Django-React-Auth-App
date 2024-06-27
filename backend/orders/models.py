from django.db import models
from accounts.models import User
from products.models import Products
# Create your models here.

class Orders(models.Model):
    id = models.IntegerField(primary_key=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    product_id = models.ForeignKey(Products, on_delete=models.CASCADE)
    product_name = models.CharField(max_length=50, blank=True)
    product_price = models.IntegerField(null=True,blank=True)
    order_date = models.DateTimeField()