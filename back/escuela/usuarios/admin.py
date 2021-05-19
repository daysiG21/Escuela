from django.contrib import admin
from .models import User, Role
# Register your models here.

@admin.register(User)
class UserAdmin(admin.ModelAdmin):
    list_display = ['id','email', 'get_full_name']

@admin.register(Role)
class RoleAdmin(admin.ModelAdmin):
    list_display = ['id','get_id_display']