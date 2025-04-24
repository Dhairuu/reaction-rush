from rest_framework import serializers
from .models import Match
from .models import User

class MatchSerializer(serializers.ModelSerializer):
    class Meta:
        model = Match
        fields = '__all__'

    
class TopPlayersSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['name', 'high_score']

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = "__all__"

