from django.urls import path
from .views import ListarCursocontroller,CRUDCursoController,ListarCategoriaController

urlpatterns =[
  path('curso',ListarCursocontroller.as_view()),
  path('curso/<int:pk>', CRUDCursoController.as_view()),
  path('',ListarCategoriaController.as_view())
]