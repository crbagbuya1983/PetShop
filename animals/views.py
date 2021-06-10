from django.shortcuts import render, get_object_or_404
from django.db.models import Q
from django.urls import reverse
# from rest_framework import generics
from rest_framework import generics, filters
# from django_filters.rest_framework import DjangoFilterBackend
from django_filters import rest_framework as filters_Backend
from rest_framework.response import Response
from .models import Animal, Pet, Breed
from .serializers import PetSerializer, AnimalSerializer, BreedSerializer

class AnimalListCreate(generics.ListCreateAPIView):
    queryset = Animal.objects.all()
    serializer_class = AnimalSerializer

class BreedListCreate(generics.ListCreateAPIView):
    
    queryset = Breed.objects.all()
    serializer_class = BreedSerializer
    

class PetListCreate(generics.ListAPIView):
    search_fields = ['breed__animalType__animalType', 'breed__breedType']
    # filter_backends = [DjangoFilterBackend]
    filter_backends = (filters.SearchFilter,)
    queryset = Pet.objects.all()
    serializer_class = PetSerializer

class PetListFilter(filters_Backend.FilterSet):
    age = filters_Backend.NumberFilter(field_name ="age", lookup_expr="lte")
    zipCode = filters_Backend.NumberFilter(field_name ="zipCode", lookup_expr="exact")

    class Meta:
        model = Pet
        fields = ['breed__animalType__animalType', 'breed__breedType', 'age', 'zipCode']

class PetListResult(generics.ListCreateAPIView):   
    serializer_class = PetSerializer
    queryset = Pet.objects.all()    
    # filter_fields = ('breed__animalType__animalType', 'breed__breedType', 'age', 'zipCode')
    filter_backends = (filters_Backend.DjangoFilterBackend,)
    filterset_class = PetListFilter


# def is_valid_queryparam(param):
#     return param != '' and param is not None 

# def cascadingddlItems(request):
#     animalObj = Animal.objects.all()
#     breedObj = Breed.objects.all()

#     context = {
#         'animalObj': animalObj,
#         'breedObj' : breedObj,
#     }

#     return render(request, "animals/index.html", context)

# def petListView(request):
#     qs = Pet.objects.all()
#     animalDDL = request.GET.get('animal-DDL')
#     breedDDL = request.GET.get('breed-DDL')
#     max_age = request.GET.get('maxAge')
#     zipC = request.GET.get('zipCode')

#     if is_valid_queryparam(animalDDL):
#         if animalDDL != '-- Select Animal --':
#             qs = qs.filter(animal__animalType=animalDDL)
    
#     if is_valid_queryparam(breedDDL):
#         if breedDDL != '-- Select Breed --':
#             qs = qs.filter(breed__breedType=breedDDL)

#     if is_valid_queryparam(max_age):
#         qs = qs.filter(age__lte=max_age)
    
#     if is_valid_queryparam(zipC):
#         qs = qs.filter(zipCode=zipC)
    
#     context = {
#         'querySet' : qs
#     }

#     return render(request, "animals/petListView.html", context)    


