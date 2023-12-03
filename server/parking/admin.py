from django.contrib import admin
import parking.models as mod
# Register your models here.

admin.site.register(mod.Auto)
admin.site.register(mod.Client)
admin.site.register(mod.Employee)
admin.site.register(mod.Parking)
admin.site.register(mod.ParkingPlace)
admin.site.register(mod.Tariff)