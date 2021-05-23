from rest_framework import serializers
from .models import CategoriaModel, CursoModel

class CategoriaSerializer(serializers.ModelSerializer):
  class Meta:
    model = CategoriaModel
    fields = '__all__'

class MostrarCursosSerializer(serializers.ModelSerializer): 
  categoria = CategoriaSerializer()
  class Meta:
    model = CursoModel
    fields= '__all__'