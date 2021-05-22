
from rest_framework.generics import ListCreateAPIView,RetrieveUpdateDestroyAPIView, ListAPIView
from rest_framework.response import Response
from .models import CursoModel,CategoriaModel
from .serializers import MostrarCursosSerializer,CategoriaSerializer

class ListarCursocontroller(ListCreateAPIView):
  queryset = CursoModel.objects.all()
  serializer_class = MostrarCursosSerializer

class CRUDCursoController(RetrieveUpdateDestroyAPIView):
  queryset = CursoModel.objects.all()
  serializer_class = MostrarCursosSerializer

class ListarCategoriaController(ListAPIView):
  queryset = CategoriaModel.objects.all()
  serializer_class=CategoriaSerializer