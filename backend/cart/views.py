from django.shortcuts import render
from .models import Cart
from .seralizer import CartSerializer
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from products.models import Products
# Create your views here.


class CartView(APIView):
    permission_classes = [IsAuthenticated]
    def post(self, request, format=None):
        serializer = CartSerializer(data = request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({"msg": 'Product added to cart'})
        return Response(serializer.errors)

    def get(self, request, format=None):
        cart = Cart.objects.filter(user=request.user)
        serializer = CartSerializer(cart, many=True)
        return Response(serializer.data)
    
    def delete(self, request, format=None):
        id = request.data.get('id')
        cart = Cart.objects.get(id=id)
        cart.delete()
        return Response({'msg': 'Item removed from cart'})


