from django.core.exceptions import AppRegistryNotReady
from django.db import models
from django.core.validators import RegexValidator
from django.contrib.auth.models import AbstractUser, BaseUserManager ## A new class is imported. ##
from django.utils.translation import gettext_lazy as _

class Role(models.Model):
    """
        Administrador
        Clientes
        Profesores
    """
    ADMIN = 0
    CLIENTE = 1
    PROFESOR = 2

    ROLE_CHOICES = (
        (ADMIN, 'administrador'),
        (CLIENTE, 'cliente'),
        (PROFESOR, 'profesor'),
    )

    id = models.PositiveSmallIntegerField(choices=ROLE_CHOICES, primary_key=True)
    titulo = models.CharField(max_length=20, blank=True)

    def __str__(self):
        return self.get_id_display()

class UserManager(BaseUserManager):
    """Define a model manager for User model with no username field."""

    use_in_migrations = True

    def _create_user(self, email, password, **extra_fields):
        """Create and save a User with the given email and password."""
        if not email:
            raise ValueError('The given email must be set')
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_user(self, email, password=None, **extra_fields):
        """Create and save a regular User with the given email and password."""
        extra_fields.setdefault('is_staff', False)
        extra_fields.setdefault('is_superuser', False)
        return self._create_user(email, password, **extra_fields)

    def create_superuser(self, email, password, **extra_fields):
        """Create and save a SuperUser with the given email and password."""
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)

        if extra_fields.get('is_staff') is not True:
            raise ValueError('Superuser must have is_staff=True.')
        if extra_fields.get('is_superuser') is not True:
            raise ValueError('Superuser must have is_superuser=True.')

        return self._create_user(email, password, **extra_fields)

    def random(self):
        count = self.aggregate(count=Count('id'))['count']
        random_index = randint(0, count - 1)
        return self.all()[random_index]

class User(AbstractUser):
    """ Usuario base
        extiende el usuario abstracto.
    """
    username = None
    email = models.EmailField(_('email'), unique=True)
    rol = models.ManyToManyField(Role, blank=True, related_name="users")
    # Extra
    foto = models.ImageField(upload_to='users/pictures', blank=True, null=True)

    creado = models.DateTimeField(auto_now_add=True)
    modificado = models.DateTimeField(auto_now=True)

    objects = UserManager()
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['first_name', 'last_name']

    def get_username(self) -> str:
        return self.email

class ClienteManager(models.Manager):
    def get_queryset(self, *args, **kwargs):
        return super().get_queryset(*args, **kwargs).filter(type=Role.CLIENTE)

class Cliente(User):
    base_type = Role.CLIENTE
    objects = ClienteManager()

    class Meta:
        proxy = True

    @property
    def more(self):
        return self.clientemore

class ClienteMore(models.Model):
    premium = models.BooleanField(default=False, blank=False)


class ProfesorManager(models.Manager):
    def get_queryset(self, *args, **kwargs):
        return super().get_queryset(*args, **kwargs).filter(type=Role.PROFESOR)

class Profesor(User):
    base_type = Role.PROFESOR
    objects = ProfesorManager()

    class Meta:
        proxy = True

    @property
    def more(self):
        return self.profesormore

class ProfesorMore(models.Model):

    class Estado(models.TextChoices):
        NONE = '', _('Sin estado')
        POSTULANTE = 'P', _('Postulante')
        ACEPTADO = 'A', _('Aceptado')
        RECHAZADO = 'R', _('Rechazado')
    
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='profesor')
    phone_regex = RegexValidator(regex=r'^\+?1?\d{9,15}$',
                                 message="El número debe estar en el formato: '+51999999999' ")
    phone_number = models.CharField(validators=[phone_regex], max_length=12, blank=True)  # validators should be a list
    estado = models.CharField(max_length=1, choices=Estado.choices, blank=False, default=Estado.NONE)

