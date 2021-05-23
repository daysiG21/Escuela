from djoser.serializers import UserCreateSerializer, UserSerializer
from django.utils.translation import gettext_lazy as _
from django.core.exceptions import ObjectDoesNotExist
from rest_framework import serializers
from rest_framework import status
from rest_framework.exceptions import APIException
from .models import User, Role

from django.core import exceptions as django_exceptions
from django.contrib.auth.password_validation import validate_password

#
# class RoleSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Role
#         fields = "__all__"


class CustomUserCreateSerializer(UserCreateSerializer):
    """ Este serializer agrega un campo extra de rol no relacionado con el modelo debido a la incompatibilidad
    de añadir una relacion many to many al crear un objeto de usuario con un primary key ya existente.

    Se desea crear un Usuario con el Rol especificado, esto se hace enviando un numero al campo rol, estos pueden ser:
    1: Cliente
    2: Profesor

    El problema se resolvio con esta respuesta de SO
    https://stackoverflow.com/questions/60735618/how-to-add-extra-field-to-django-serializer
    """
    tipo = serializers.IntegerField(write_only=True)

    class Meta(UserCreateSerializer.Meta):
        model = User
        fields = ('email', 'password', 'first_name', 'last_name', 'tipo')

    def validate(self, attrs):
        tipo = attrs.pop('tipo')
        user = User(**attrs)
        password = attrs.get("password")

        try:
            validate_password(password, user)
        except django_exceptions.ValidationError as e:
            serializer_error = serializers.as_serializer_error(e)
            raise serializers.ValidationError(
                {"password": serializer_error["non_field_errors"]}
            )

        attrs['tipo'] = tipo
        return attrs

    def create(self, validated_data):
        rol = validated_data.pop('tipo')
        try:
            rol = Role.objects.get(id=rol)
            if rol:
                user = User.objects.create_user(**validated_data)
                user.rol.add(rol)
                return user
        except APIException:
            raise APIException(
                detail=_("Hubo un error al registrar el usuario"),
                code=status.HTTP_500_INTERNAL_SERVER_ERROR
            )

        except ObjectDoesNotExist:
            raise APIException(
                detail=_("El rol especificado no existe"),
                code=status.HTTP_404_NOT_FOUND
            )
