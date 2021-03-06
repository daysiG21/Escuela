from django.shortcuts import render, get_object_or_404
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework import status
from rest_framework.response import Response
from rest_framework.generics import RetrieveUpdateAPIView

# Permissions
from rest_framework import permissions
from usuarios.permissions import IsAccountOwner

# Serializers
from djoser.serializers import UserSerializer




from .serializers import UpdateUserSerializer

# Create your views here.
from .models import User


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def restricted(request, *args, **kwargs):
    return Response(data="Solo para usuarios registrados", status=status.HTTP_200_OK)


# @api_view(['PATCH'])
# @permission_classes([IsAuthenticated])
# def update_user_photo(request, *args, **kwargs):
#     return Response(data="Solo para usuarios registrados", status=status.HTTP_200_OK)

class CustomUpdatePermission(permissions.BasePermission):
    """
    Permission class to check that a user can update his own resource only
    """

    def has_permission(self, request, view):
        # check that its an update request and user is modifying his resource only
        if view.action == 'update' and view.kwargs['id']!=request.user.id:
            return False # not grant access
        return True # grant access otherwise


class UpdateUserProfileController(RetrieveUpdateAPIView):
    """ Controlador de vista de actualizacion
        del perfil de usuario. """

    serializer_class = UpdateUserSerializer
    permission_classes = (IsAccountOwner, IsAuthenticated)
    queryset = User.objects.all()
