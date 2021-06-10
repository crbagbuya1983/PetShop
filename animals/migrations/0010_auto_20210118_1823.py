# Generated by Django 2.0.7 on 2021-01-19 02:23

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('animals', '0009_auto_20210118_1807'),
    ]

    operations = [
        migrations.AlterField(
            model_name='pet',
            name='animal',
            field=models.ForeignKey(blank=True, default='', null=True, on_delete=django.db.models.deletion.SET_NULL, to='animals.Animal'),
        ),
        migrations.AlterField(
            model_name='pet',
            name='breed',
            field=models.ForeignKey(blank=True, default='', null=True, on_delete=django.db.models.deletion.SET_NULL, to='animals.Breed'),
        ),
    ]
