from django.db import models

# Create your models here.
class PagoModel(models.Model):
    pagoId = models.AutoField(
        primary_key=True,
        unique=True,
        null=False,
        db_column='id'
    )

    pagoIdPasarela = models.IntegerField(
        unique=True,
        null=False,
        db_column='id_pasarela'
    )

    pagoPrecio = models.DecimalField(
        max_digits=5,
        decimal_places=2,
        db_column='monto',
        verbose_name='precio del curso',
        help_text='precio del curso',
        default=0.00
    )

    # items (many to many)

    pagoEstado = models.CharField(
        max_length=10,
        null=False,
        db_column='estado',
        verbose_name='estado',
        help_text='Estado del pago',
        default='--'
    )

    pagoDetalleEstado = models.CharField(
        max_length=10,
        null=False,
        db_column='detalle_estado',
        help_text='Detalle del estado',
        default='--'
    )

    """ clientes_id = models.ForeignKey(
        to=ClienteModel,
        db_column='cliente_id',
        on_delete=models.SET_NULL,
        verbose_name='id del cliente',
        help_text='id del cliente'
    ) """

    class Meta:
        db_table = 'pagos'
        verbose_name = 'pago'
        verbose_name_plural = 'pagos'


class PagosCursoModel(models.Model):
    pagoIdFK = models.ForeignKey(
        to=PagoModel,
        db_column='pago_id',
        on_delete=models.CASCADE,
        verbose_name='id de pago',
        help_text='id de pago'
    )

    """ cursoIdFK = models.ForeignKey(
        to=CursoModel,
        db_column='curso_id',
        on_delete=models.SET_NULL,
        verbose_name='id de curso',
        help_text='id de curso'
    ) """

    class Meta:
        db_table = 'pagos_curso'
        verbose_name = 'pago_curso'
        verbose_name_plural = 'pago_curso'
