from django.shortcuts import render
from rest_framework.views import APIView
from .models import Orders
from .serializers import OrderSerializer
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated


# Create your views here.
class OrdersView(APIView):
    permission_classes = [IsAuthenticated]
    def get(self, request,pk=None, format=None):
        if pk is not None:
            order = Orders.objects.get(pk=pk)
            serializer = OrderSerializer(order)
            return Response(serializer.data)
        orders = Orders.objects.all()
        serializer = OrderSerializer(orders, many=True)
        return Response(serializer.data)
    
    def post(self, request, format=None):
        serializer = OrderSerializer(data= request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({'msg': 'Ordered Successfully'})
        return Response(serializer.errors)