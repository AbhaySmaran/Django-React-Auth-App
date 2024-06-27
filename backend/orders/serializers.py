from rest_framework import serializers
from .models import Orders

class OrderSerializer():
    class Meta:
        model = Orders
        fields = '__all__'

