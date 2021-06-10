from django.urls import path, re_path
from django.conf.urls import url
# from .views import cascadingddlItems, petListView
from . import views

# app_name = 'animals'

urlpatterns = [

    path('api/petlist/', views.PetListCreate.as_view()),
    path('api/animallist/', views.AnimalListCreate.as_view()),
    path('api/breedlist/', views.BreedListCreate.as_view()),
    path('api/petresult/', views.PetListResult.as_view()),
    # re_path(r'api/petresult/(?P<age>\w+)=\d+&(?P<animalType>\w+)=\w+&(?P<breedType>\w+)=\w+&(?P<zip>\w+)=\d+', views.PetListResult.as_view()),
    # path('', cascadingddlItems, name='cascade-ddl'),
    # path('list/', petListView ,name='pet-list')
     
]