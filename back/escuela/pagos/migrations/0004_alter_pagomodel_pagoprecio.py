# Generated by Django 3.2.2 on 2021-05-29 08:25

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('pagos', '0003_alter_pagomodel_pagoidpasarela'),
    ]

    operations = [
        migrations.AlterField(
            model_name='pagomodel',
            name='pagoPrecio',
            field=models.DecimalField(db_column='monto', decimal_places=2, default=0.0, help_text='precio del curso', max_digits=6, verbose_name='precio del curso'),
        ),
    ]