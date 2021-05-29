from django.urls import path
from .views import ListarCursocontroller,CRUDCursoController

urlpatterns =[
  path('',ListarCursocontroller.as_view()),
  path('<int:pk>/', CRUDCursoController.as_view())
]