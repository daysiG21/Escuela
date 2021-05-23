# Generated by Django 3.2.2 on 2021-05-20 22:48

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('usuarios', '0001_initial'),
        ('cursos', '0002_cursomodel_profesor'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='cursomodel',
            name='profesor',
        ),
        migrations.AddField(
            model_name='cursomodel',
            name='profesorId',
            field=models.ForeignKey(db_column='profesor_id', help_text='Profesor', null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='profesorCursos', to='usuarios.profesormore', verbose_name='profesor'),
        ),
        migrations.AlterField(
            model_name='categoriamodel',
            name='categoriaNombre',
            field=models.CharField(db_column='nombre', help_text='Nombre de la categoría', max_length=100, verbose_name='nombre'),
        ),
        migrations.AlterField(
            model_name='cursomodel',
            name='cursoImagen',
            field=models.ImageField(blank=True, db_column='imagen', null=True, upload_to='cursos/imagenes'),
        ),
        migrations.AlterField(
            model_name='cursomodel',
            name='descripionCurso',
            field=models.TextField(db_column='descripcion', help_text='Descripción del curso', max_length=1000, verbose_name='descripción'),
        ),
    ]