from rest_framework.decorators import api_view
from .serializers import ProductSerializer
from .models import Products
from rest_framework.response import Response

@api_view(['GET'])
def ProductView(request):
    product = Products.objects.all()
    serializer = ProductSerializer(product, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def ProductDetail(request, id):
    product = Products.objects.get(pk= id)
    serializer = ProductSerializer(product)
    return Response(serializer.data)