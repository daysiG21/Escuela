# Generated by Django 3.2.2 on 2021-05-22 18:20

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('usuarios', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='role',
            name='titulo',
        ),
        migrations.AlterField(
            model_name='role',
            name='id',
            field=models.PositiveSmallIntegerField(choices=[(1, 'cliente'), (2, 'profesor')], primary_key=True, serialize=False),
        ),
    ]