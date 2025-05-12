from rest_framework import serializers
from .models import Cart
from accounts.serializers import UserProfileSerializer
from products.serializers import ProductSerializer

class CartSerializer(serializers.ModelSerializer):
    class Meta:
        model = Cart
        fields = '__all__'

    def create(self, validated_data):
        return Cart.objects.create(**validated_data)

class CartViewSerializer(serializers.ModelSerializer):
    user = UserProfileSerializer() 
    product = ProductSerializer()

    class Meta:
        model = Cart
        fields = ['user','product']