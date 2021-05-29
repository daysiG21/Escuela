from django.urls import path
from .views import PaymentCreate

urlpatterns =[
  path('', PaymentCreate.as_view(), name='create'),
]