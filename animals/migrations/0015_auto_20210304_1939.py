# Generated by Django 2.0.7 on 2021-03-05 03:39

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('animals', '0014_auto_20210304_1906'),
    ]

    operations = [
        migrations.AlterField(
            model_name='pet',
            name='image',
            field=models.ImageField(blank=True, max_length=255, null=True, upload_to=''),
        ),
    ]
