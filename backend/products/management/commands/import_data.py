import os
import requests
from decimal import Decimal
from django.core.files.base import ContentFile  # Import ContentFile
from django.core.management.base import BaseCommand
from products.models import Products

def get_products():
    url = 'https://dummyjson.com/products'
    response = requests.get(url, headers={'Content-Type': 'application/json'})
    response.raise_for_status()  # Raise an exception for HTTP errors
    data = response.json()  # Parse the JSON response
    return data.get('products', [])  # Extract the list of products

def download_image(image_url):
    response = requests.get(image_url)
    response.raise_for_status()  # Raise an exception for HTTP errors
    return ContentFile(response.content, name=os.path.basename(image_url))  # Return ContentFile object

def seed_products():
    products = get_products()
    for product_data in products:
        image_url = product_data.get('thumbnail')
        if image_url:
            image_file = download_image(image_url)
            product = Products(
                id=product_data.get('id'),
                title=product_data.get('title', 'No Title'),
                price=Decimal(product_data.get('price', '0.00')),
                description=product_data.get('description', 'No Description'),
                brand=product_data.get('brand', 'No Brand'),
                category = product_data.get('category', 'No Category'),
                rating = product_data.get('rating', 'No Rating'),
                stock = product_data.get('stock', 'Out of Stock'),
                image=image_file , # Assign ContentFile directly
                availabilityStatus = product_data.get('availabilityStatus', 'Out of Stocks')
            )
            product.save()

class Command(BaseCommand):
    help = 'Seed the database with products'

    def handle(self, *args, **kwargs):
        seed_products()
        self.stdout.write(self.style.SUCCESS('Database seeding completed'))
