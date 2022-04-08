from rest_framework import serializers
from .models import User
from django.contrib.auth import authenticate

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('userId', 'password')

class LoginSerializer(serializers.ModelSerializer):
    userId = serializers.CharField()
    password = serializers.CharField()

    def validate(self, data):
        user = authenticate
    class Meta:
        model = User
        fields = ('userId', 'password')