# Generated by Django 4.2.5 on 2023-12-12 19:36

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('parking', '0003_auto_model'),
    ]

    operations = [
        migrations.AlterField(
            model_name='auto',
            name='place',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to='parking.parkingplace', unique=True),
        ),
    ]
