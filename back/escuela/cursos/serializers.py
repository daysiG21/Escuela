from django.db.models import fields
from rest_framework import serializers
from .models import CategoriaModel, CursoModel
from usuarios.models import ProfesorMore,User

class CategoriaSerializer(serializers.ModelSerializer):
  class Meta:
    model = CategoriaModel
    fields = '__all__'

class UsuarioSerializer(serializers.ModelSerializer):
  class Meta:
    model=User
    fields='__all__'

class ProfesorSerializer(serializers.ModelSerializer):
  user = UsuarioSerializer()
  class Meta:
    model=ProfesorMore
    fields = '__all__'

class MostrarCursosSerializer(serializers.ModelSerializer): 
  categoria = CategoriaSerializer()
  profesorId = ProfesorSerializer()
  class Meta:
    model = CursoModel
    fields= '__all__'