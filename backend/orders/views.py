from django.shortcuts import render
from rest_framework.views import APIView
from .models import Orders
from .serializers import OrderSerializer
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated

# Create your views here.
class OrdersView(APIView):
    permission_classes = [IsAuthenticated]
    def get(self, request, format=None):
        orders = Orders.objects.all()
        serializer = OrderSerializer(orders, many=True)
        return Response(serializer.data)