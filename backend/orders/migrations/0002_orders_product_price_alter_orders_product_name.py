# Generated by Django 5.0.5 on 2024-06-26 18:19

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('orders', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='orders',
            name='product_price',
            field=models.IntegerField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='orders',
            name='product_name',
            field=models.CharField(blank=True, max_length=50),
        ),
    ]