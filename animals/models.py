from django.db import models
from django.urls import reverse

import base64

import os
import json
import requests

# Create your models here.

class Animal(models.Model):    
    animalType = models.CharField(max_length=50, unique=True)

    def __str__(self):
        return self.animalType

class Breed(models.Model):
    animalType = models.ForeignKey(Animal, on_delete=models.CASCADE)
    breedType = models.CharField(max_length=50, unique=True)

    def __str__(self):
        return self.breedType

class Pet(models.Model):   
    name = models.CharField(max_length=50, default='')
    age = models.PositiveIntegerField()
    animal = models.ForeignKey(Animal, on_delete=models.SET_NULL, blank=True, null=True, default='')    
    breed = models.ForeignKey(Breed, on_delete=models.SET_NULL, blank=True, null=True, default='')    
    address = models.CharField(max_length=155, default='')
    city = models.CharField(max_length=50, default='')
    state = models.CharField(max_length=2, default='')
    zipCode = models.PositiveIntegerField(default=0)
    description = models.TextField(max_length=10000, default='')
    image = models.ImageField(upload_to='', max_length=255, blank=True, null=True)
    item_image_url = models.TextField(default='',blank=True, null=True)

    def save(self):
        encodedString = base64.b64encode(self.image.file.read())
        data = {"key": "e4a9e781afb97ef17ad1f130e35f2442", "image": encodedString.decode("utf-8")}
        uploadedImageInfo = requests.post("https://api.imgbb.com/1/upload", data=data)
        jsonResponse = json.loads(uploadedImageInfo.text)
        self.item_image_url = jsonResponse["data"]["display_url"]
        super().save()

    
        
    
