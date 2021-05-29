from django.shortcuts import render
from django.http import HttpResponse

from rest_framework import generics, status
from rest_framework.response import Response
from .models import PagoModel
from .mercadopagoviews import crear_preferencia
# Serializers
from .serializers import CreatePagoModelSerializer


class PaymentCreate(generics.ListCreateAPIView):
    queryset = PagoModel.objects.all()
    serializer_class = CreatePagoModelSerializer

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        url = crear_preferencia(serializer.instance, serializer.validated_data)
        headers = self.get_success_headers(serializer.data)
        return Response({"url": url}, status=status.HTTP_201_CREATED, headers=headers)