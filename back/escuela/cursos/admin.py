from django.contrib import admin
from .models import CategoriaModel,CursoModel

class CursoAdmin(admin.ModelAdmin):
  list_display=['categoria','cursoTema','cursoPrecio']
  search_fields =['cursoTema','categoria']
  
admin.site.register(CategoriaModel)
admin.site.register(CursoModel,CursoAdmin)
