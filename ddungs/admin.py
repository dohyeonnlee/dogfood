from django.contrib import admin
from .models import User

class UserAdmin(admin.ModelAdmin):
    user_list = ('userId', 'password', 'nickname', 'email', 'mydogBreed', 'mydogSize', 'preferFood')

admin.site.register(User, UserAdmin)