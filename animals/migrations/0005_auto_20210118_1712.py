# Generated by Django 2.0.7 on 2021-01-19 01:12

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('animals', '0004_auto_20210118_1708'),
    ]

    operations = [
        migrations.RenameField(
            model_name='breed',
            old_name='animalType',
            new_name='name',
        ),
        migrations.RemoveField(
            model_name='pet',
            name='animal',
        ),
    ]
