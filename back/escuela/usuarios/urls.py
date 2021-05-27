from django.urls import path, include
from mercadopago import sdk
from .views import restricted
from .views import UpdateUserProfileController
#importaciOn de la libreria mercado pago
import mercadopago

urlpatterns = [
    path('', include('djoser.urls')),
    path('', include('djoser.urls.authtoken')),
    path('users/update/<int:pk>/', UpdateUserProfileController.as_view()),
    path('restricted/', restricted, name='restringido'),
]


