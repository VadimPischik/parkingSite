from django.db import models

# Create your models here.

class Parking(models.Model):
    id = models.AutoField(primary_key=True)
    address = models.CharField(max_length=255)


class Client(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=255)
    phone = models.CharField(max_length=20)
    login = models.CharField(max_length=255, unique=True)
    password = models.CharField(max_length=255)

class Tariff(models.Model):
    id = models.AutoField(primary_key=True)
    description = models.TextField(max_length=255)
    price = models.FloatField()

class ParkingPlace(models.Model):
    id = models.AutoField(primary_key=True)
    number = models.IntegerField()
    parking = models.ForeignKey(Parking, to_field="id", on_delete=models.CASCADE)

class Auto(models.Model):
    id = models.AutoField(primary_key=True)
    tarif = models.ForeignKey(Tariff, to_field="id", 
                              on_delete=models.SET_NULL, null=True)
    place = models.ForeignKey(ParkingPlace, to_field="id", 
                               on_delete=models.SET_NULL, null=True, unique=True)
    owner = models.ForeignKey(Client, to_field="id", on_delete=models.CASCADE)
    
    model = models.CharField(max_length=255)


class Employee(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=255)
    parking=  models.ForeignKey(Parking, to_field="id", 
                                on_delete=models.SET_NULL, null=True)
    login = models.CharField(max_length=255, unique=True)
    password = models.CharField(max_length=255)
    type = models.CharField(max_length=20)