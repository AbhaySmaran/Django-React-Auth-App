from django.shortcuts import render
from .models import Cart
from .seralizer import CartSerializer,CartViewSerializer
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from products.models import Products
from accounts.models import User
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
        cart_items = Cart.objects.select_related('product').filter(user=request.user)
        serializer = CartViewSerializer(cart_items, many=True)
        return Response(serializer.data)
    
    def delete(self, request, product_id=None,format=None):
        product_id = request.data.get('product_id')
        Cart.objects.filter(product=product_id, user=request.user).delete()
        return Response({'msg': 'Item removed from cart'})


