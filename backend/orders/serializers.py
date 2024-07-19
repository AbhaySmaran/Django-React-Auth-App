from rest_framework import serializers
from .models import Orders

class OrderSerializer(serializers.ModelSerializer):
    class Meta:
        model = Orders
        fields = '__all__'

    def create(self,validated_data):
        return Orders.objects.create(**validated_data)

