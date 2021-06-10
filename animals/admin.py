from django.contrib import admin

from .models import Animal, Pet , Breed

# Register your models here.



class PetAdmin(admin.ModelAdmin):
    list_display = ('id','name','age','animal','breed', 'zipCode', 'image')

class BreedAdmin(admin.ModelAdmin):
    list_display = ('id', 'animalType', 'breedType')

class AnimalAdmin(admin.ModelAdmin):
    list_display = ('id', 'animalType')

admin.site.register(Animal, AnimalAdmin)
admin.site.register(Pet, PetAdmin)
admin.site.register(Breed, BreedAdmin)