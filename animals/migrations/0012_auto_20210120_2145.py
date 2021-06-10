# Generated by Django 2.0.7 on 2021-01-21 05:45

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('animals', '0011_pet_zipcode'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='pet',
            name='location',
        ),
        migrations.AddField(
            model_name='pet',
            name='address',
            field=models.CharField(default='', max_length=155),
        ),
        migrations.AddField(
            model_name='pet',
            name='city',
            field=models.CharField(default='', max_length=50),
        ),
        migrations.AddField(
            model_name='pet',
            name='description',
            field=models.TextField(default='', max_length=10000),
        ),
        migrations.AddField(
            model_name='pet',
            name='state',
            field=models.CharField(default='', max_length=2),
        ),
    ]
