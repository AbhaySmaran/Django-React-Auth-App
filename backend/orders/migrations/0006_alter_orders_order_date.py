# Generated by Django 5.0.5 on 2024-06-28 05:39

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('orders', '0005_alter_orders_order_date'),
    ]

    operations = [
        migrations.AlterField(
            model_name='orders',
            name='order_date',
            field=models.DateField(auto_now_add=True),
        ),
    ]
