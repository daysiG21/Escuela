# Generated by Django 3.2.2 on 2021-05-23 02:34

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('usuarios', '__first__'),
    ]

    operations = [
        migrations.CreateModel(
            name='CategoriaModel',
            fields=[
                ('categoriaId', models.AutoField(db_column='id', help_text='Id de la categoria', primary_key=True, serialize=False, unique=True, verbose_name='id')),
                ('categoriaNombre', models.CharField(db_column='nombre', help_text='Nombre de la categoría', max_length=100, verbose_name='nombre')),
            ],
            options={
                'verbose_name': 'categoria',
                'verbose_name_plural': 'categorias',
                'db_table': 'categoria',
                'ordering': ['categoriaNombre'],
            },
        ),
        migrations.CreateModel(
            name='CursoModel',
            fields=[
                ('cursoId', models.AutoField(db_column='id', help_text='Id del curso', primary_key=True, serialize=False, unique=True, verbose_name='id')),
                ('cursoTema', models.CharField(db_column='tema', help_text='Ingrese el tema del curso', max_length=200, verbose_name='tema')),
                ('cursoPrecio', models.DecimalField(db_column='precio', decimal_places=2, help_text='Ingrese el precio del curso', max_digits=5, verbose_name='Precio')),
                ('cursoImagen', models.ImageField(blank=True, db_column='imagen', null=True, upload_to='cursos/imagenes', verbose_name='Imágen')),
                ('descripionCurso', models.TextField(db_column='descripcion', help_text='Ingrese la descripción del curso', max_length=1000, verbose_name='descripción')),
                ('categoria', models.ForeignKey(db_column='categoria_id', help_text='Seleccione la categoría', on_delete=django.db.models.deletion.CASCADE, related_name='categoriaCursos', to='cursos.categoriamodel', verbose_name='categoria')),
                ('profesorId', models.ForeignKey(db_column='profesor_id', help_text='Seleccione el profesor', null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='profesorCursos', to='usuarios.profesormore', verbose_name='profesor')),
            ],
            options={
                'verbose_name': 'curso',
                'verbose_name_plural': 'cursos',
                'db_table': 'curso',
            },
        ),
    ]
