from django.db import models
from usuarios.models import ClienteMore
from cursos.models import CursoModel

# Libreria de traduccion
from django.utils.translation import ugettext_lazy as _


class PagoModel(models.Model):

    class Status(models.TextChoices):
        NONE = '', _('Sin estado')
        EN_PROCESO = 'IN', _('En Proceso')
        APROBADO = 'A', _('Aprobado')
        RECHAZADO = 'R', _('Rechazado')

    pagoId = models.AutoField(primary_key=True,unique=True,null=False,db_column='id')
    pagoIdPasarela = models.CharField(max_length=50, blank=False, default='none', db_column='id_pasarela', help_text='id de pago')  # ID payment in MercadoPago
    pagoPrecio = models.DecimalField(max_digits=6, decimal_places=2, default=00.00,
                                     db_column='monto', verbose_name='precio del curso',
                                     help_text='precio del curso')

    cursosItems = models.ManyToManyField(to=CursoModel, through='PagosCursoModel')     # items (many to many)

    pagoEstado = models.CharField(max_length=2, choices=Status.choices, blank=False, default=Status.NONE,
                                  db_column='estado',
                                  verbose_name='estado',
                                  help_text='estado del pago')
    pagoDetalleEstado = models.CharField(max_length=10,null=False,db_column='detalle_estado',
                                         help_text='detalle del estado del pago')
    clientes_id = models.ForeignKey(to=ClienteMore,db_column='cliente_id',on_delete=models.CASCADE,
                                    verbose_name='id del cliente',
                                    help_text='id del cliente')

    class Meta:
        db_table = 'pagos'
        verbose_name = 'pago'
        verbose_name_plural = 'pagos'


class PagosCursoModel(models.Model):

    """ Modelo intermedio para la relacion Many to Many entre PagosModel y CursosModel"""

    pagoIdFK = models.ForeignKey(
        to='PagoModel',
        db_column='pago_id',
        on_delete=models.CASCADE,
        verbose_name='id de pago',
        help_text='id de pago',
    )

    cursoIdFK = models.ForeignKey(
        to=CursoModel,
        db_column='curso_id',
        on_delete=models.CASCADE,
        verbose_name='id de curso',
        help_text='id de curso',
    )

    class Meta:
        db_table = 'pagos_curso'
        verbose_name = 'pago_curso'
        verbose_name_plural = 'pago_curso'