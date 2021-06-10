from rest_framework import serializers

from .models import Animal, Pet, Breed

class AnimalSerializer(serializers.ModelSerializer):

    class Meta:
        model = Animal
        # fields = ('id','animalType')
        fields = '__all__'

class BreedSerializer(serializers.ModelSerializer):

    class Meta:
        model = Breed
        fields = ( 'id','animalType', 'breedType')
        depth = 1
        

class PetSerializer(serializers.ModelSerializer):
    
    
    class Meta:
        model = Pet
        fields = ('id', 'name', 'age','breed', 'address', 'city', 'state', 'zipCode', 'description', 'item_image_url')
        depth = 2

