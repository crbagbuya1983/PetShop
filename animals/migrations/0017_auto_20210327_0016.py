# Generated by Django 2.0.7 on 2021-03-27 07:16

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('animals', '0016_pet_item_image_url'),
    ]

    operations = [
        migrations.AlterField(
            model_name='pet',
            name='item_image_url',
            field=models.TextField(blank=True, default='', null=True),
        ),
    ]
