# Generated by Django 2.0.7 on 2021-03-27 06:15

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('animals', '0015_auto_20210304_1939'),
    ]

    operations = [
        migrations.AddField(
            model_name='pet',
            name='item_image_url',
            field=models.TextField(default=''),
        ),
    ]