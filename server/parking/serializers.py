from rest_framework import serializers
import parking.models as mod

class ParkingSerializer(serializers.ModelSerializer):

    class Meta:
        model = mod.Parking
        fields = "__all__"
    
    free_places =  serializers.SerializerMethodField("free")
    total_places =  serializers.SerializerMethodField("total")

    def free(self, obj):
        handled = mod.Auto.objects.filter(place__parking = obj).count()
        total = self.total(obj)
        return total - handled

    def total(self, obj):
        return mod.ParkingPlace.objects.filter(parking=obj).count()
    

class ClientSerializer(serializers.ModelSerializer):

    class Meta:
        model = mod.Client
        #fields = "__all__"
        exclude  = ["login", "password"]

class EmployeeSerializer(serializers.ModelSerializer):

    class Meta:
        model = mod.Employee
        #fields = "__all__"
        exclude  = ["login", "password"]

class TarifSefializer(serializers.ModelSerializer):

    class Meta:
        model = mod.Tariff
        fields = "__all__"

class AutoSerializer(serializers.ModelSerializer):

    class Meta:
        model = mod.Auto
        fields = "__all__"


class ParkingPlaceSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = mod.ParkingPlace
        fields = "__all__"


    