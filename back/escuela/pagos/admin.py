from django.contrib import admin
from .models import PagoModel, PagosCursoModel
# Register your models here.

class CursosItemsInline(admin.StackedInline):
    model = PagosCursoModel

@admin.register(PagoModel)
class PagoModelAdmin(admin.ModelAdmin):
    list_display = ('pk', 'clientes_id', 'pagoPrecio', 'pagoEstado')
    inlines = (CursosItemsInline,)



