from django.shortcuts import render
from rest_framework import status, generics
from rest_framework.response import Response
from rest_framework.views import APIView
from .serializers import UserRegistrationSerializer, LoginSerializer, QuestionSerializer, LeaderboardSerializer
from django.contrib.auth import authenticate
from rest_framework.permissions import IsAuthenticated
from rest_framework.authtoken.models import Token 
from rest_framework.authentication import TokenAuthentication
from .models import Question, Leaderboard
import logging

# Set up logging
logger = logging.getLogger(__name__)

# Class for registration
class UserRegistrationView(APIView):
    def post(self, request):
        serializer = UserRegistrationSerializer(data=request.data)
        if serializer.is_valid():
            try:
                serializer.save()
                return Response(serializer.data, status=status.HTTP_201_CREATED)
            except Exception as e:
                logger.error(f"Error occured during user save: {e}")
                return Response({"error": "Internal server error. " + str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        else:
            logger.debug(f"Invalid data: {serializer.errors}")
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

#Class for login
class LoginView(APIView):
    def post(self, request):
        serializer = LoginSerializer(data=request.data)
        if serializer.is_valid():
            username = serializer.validated_data['username']
            password = serializer.validated_data['password']
            user = authenticate(request, username=username, password=password)

            if user is not None:
                token, created = Token.objects.get_or_create(user=user)
                return Response({'token': token.key}, status=status.HTTP_200_OK)
            else:
                return Response({'error': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

#Class for logout
class LogoutView(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def post(self, request):
        try:
            #Remove token from user
            request.user.auth_token.delete()
            return Response(status=status.HTTP_200_OK)
        except Token.DoesNotExist:
            return Response(status=status.HTTP_400_BAD_REQUEST)

#Class for retrieving questions
class QuestionListAPI(generics.ListAPIView):
    serializer_class = QuestionSerializer

    def get_queryset(self):
        category = self.request.query_params.get('category')
        difficulty = self.request.query_params.get('difficulty')
        qs = Question.objects.all()

        if category:
            qs = qs.filter(category=category)

        if difficulty:
            qs = qs.filter(difficulty=difficulty)
        
        return qs

    def list(self, request, *args, **kwargs):
        queryset = self.get_queryset()
        if not queryset.exists():
            return Response({"detail": "No questions found for the specified category and difficulty"}, status=status.HTTP_404_NOT_FOUND)
        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

#Class for leaderboard
class LeaderboardListCreate(APIView):
    serializer_class = LeaderboardSerializer 

    def get(self, request, *args, **kwargs):
        categories = Leaderboard.objects.values_list('category', flat=True).distinct()
        
        leaderboard_data = []
        for category in categories:
            top_scores = Leaderboard.objects.filter(category=category).order_by('-score')[:3]
            serializer = LeaderboardSerializer(top_scores, many=True)
            leaderboard_data.append({
                'category': category,
                'scores': serializer.data
            })
        
        return Response(leaderboard_data)

    def post(self, request, *args, **kwargs):
        userName = request.data.get('userName')
        score = request.data.get('score')
        category = request.data.get('category')

        leaderboard = Leaderboard.objects.filter(category=category).order_by('-score')

        if leaderboard.count() < 3 or score > leaderboard.last().score:
            if leaderboard.count() == 3:
                leaderboard.last().delete()
            
            new_entry = Leaderboard(username=userName, score=score, category=category)
            new_entry.save()
            return Response({'status': 'Score added!'}, status=status.HTTP_201_CREATED)
        
        return Response({'status': 'Score not high enough.'}, status=status.HTTP_200_OK)

