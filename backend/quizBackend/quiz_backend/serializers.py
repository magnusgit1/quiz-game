from rest_framework import serializers
from django.contrib.auth.models import User 
from django.contrib.auth.password_validation import validate_password
from .models import Question, Choice, Leaderboard

#Serializer for registration
class UserRegistrationSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, required=True, validators=[validate_password])
    password2 = serializers.CharField(write_only=True, required=True)

    class Meta:
        model = User 
        fields = ('username', 'password', 'password2')

    def validate(self, attributes):
        if attributes['password'] != attributes['password2']:
            raise serializers.ValidationError({"password": "Password fields must match."})
        
        return attributes 
    
    def create(self, validated_data):
        user = User.objects.create(
            username=validated_data['username']
        )

        #Creates hashed passwords
        user.set_password(validated_data['password'])
        user.save()

        return user 
    
#Serializer for login
class LoginSerializer(serializers.Serializer):
    username = serializers.CharField(write_only=True)
    password = serializers.CharField(write_only=True)

#Serializer for Answer-choices
class ChoiceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Choice 
        fields = ['id', 'choice_text', 'is_correct']

#Serializer for Questions
class QuestionSerializer(serializers.ModelSerializer):
    choices = ChoiceSerializer(many=True)
    
    class Meta:
        model = Question 
        fields = ['id', 'question_text', 'difficulty', 'choices']

#Serializer for Leaderboard
class LeaderboardSerializer(serializers.ModelSerializer):
    class Meta:
        model = Leaderboard 
        fields = ('username', 'score', 'category')

