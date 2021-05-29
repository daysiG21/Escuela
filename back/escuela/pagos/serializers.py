import json
from django.utils.translation import gettext_lazy as _
from django.core.exceptions import ObjectDoesNotExist
from rest_framework import serializers
from rest_framework.response import Response
from rest_framework import status
from rest_framework.exceptions import APIException
from .models import PagoModel, PagosCursoModel
from cursos.models import CursoModel
from .mercadopagoviews import crear_preferencia
from django.core.serializers.json import Serializer


class MPSerializer(Serializer):
    def get_dump_object(self, obj):
        mapped_object = {
            "url": obj.url
        }
        return mapped_object


class CreatePagoModelSerializer(serializers.HyperlinkedModelSerializer):

    carrito = serializers.ListField(write_only=True)

    class Meta:
        model = PagoModel
        fields = ['carrito']

    def validate(self, attrs):
        """ Validar que los Ids de los cursos enviados existen. """
        carrito = attrs['carrito']
        cursos = []
        try:
            for curso in carrito:
               obj = CursoModel.objects.get(cursoId=curso['cursoId'])
               cursos.append(obj)
        except ObjectDoesNotExist:
            raise APIException(
                detail=_("El curso especificado no existe"),
                code=status.HTTP_404_NOT_FOUND
            )

        validated_data = dict()
        validated_data['carrito'] = cursos
        return validated_data

    def create(self, validated_data):
        cursos = validated_data['carrito']
        try:
            # Como obtener usuario del contexto
            # https://stackoverflow.com/questions/29524826/how-to-get-authenticated-user-on-serializer-class-for-validation
            pago = PagoModel.objects.create(clientes_id=self.context['request'].user.cliente)
            for curso in cursos:
                PagosCursoModel.objects.create(pagoIdFK=pago, cursoIdFK=curso)

            return pago

        except APIException:
            raise APIException(
                detail=_("Hubo un error al crear el pago"),
                code=status.HTTP_500_INTERNAL_SERVER_ERROR
            )

