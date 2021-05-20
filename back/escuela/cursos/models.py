from django.db import models
from usuarios.models import ProfesorMore

class CategoriaModel(models.Model):
  categoriaId = models.AutoField(
    primary_key=True, 
    unique = True, 
    null = False,
    db_column ='id',
    verbose_name='id',
    help_text='Id de la categoria'
  )
  categoriaNombre = models.CharField(
    max_length=100, 
    null=False,
    db_column='nombre',
    verbose_name='nombre', #mostrar en el panel administrativo
    help_text='Nombre de la categoría' #ayuda para que sea visible en el panel administrativo
  )

  def __str__(self):    
    return self.categoriaNombre
    

  class Meta:
    db_table ='categoria'
    verbose_name='categoria'
    verbose_name_plural='categorias'

class CursoModel(models.Model):
  cursoId = models.AutoField(
    primary_key=True,
    unique=True,
    null=False,
    db_column='id',
    verbose_name='id',
    help_text='Id del curso'
  )
  cursoTema=models.CharField(
    db_column='tema',
    max_length=200,
    verbose_name='tema',
    help_text='Tema del curso'
  )
  cursoPrecio=models.DecimalField(
    max_digits=5,
    decimal_places=2,
    db_column='precio',
    verbose_name='Precio del curso',
    help_text='Precio del curso',
  )
  categoria = models.ForeignKey(
    to=CategoriaModel,
    db_column='categoria_id',
    on_delete=models.CASCADE,
    related_name='categoriaCursos', 
    verbose_name='categoria',
    help_text='Categoria del curso'
  )
  profesorId = models.ForeignKey(
    to=ProfesorMore,
    db_column='profesor_id',
    on_delete=models.SET_NULL,
    related_name='profesorCursos', 
    verbose_name='profesor',
    help_text='Profesor',
    null=True
  )
 
  cursoImagen=models.ImageField(
   upload_to='cursos/imagenes',
      blank=True,
      null=True, db_column='imagen')

  descripionCurso=models.TextField(
    db_column='descripcion',
    max_length=1000,
    help_text='Descripción del curso',
    verbose_name='descripción',
  )

  def __str__(self):    
    return self.cursoTema
  
  class Meta:
    db_table='curso'
    verbose_name='curso'
    verbose_name_plural='cursos'