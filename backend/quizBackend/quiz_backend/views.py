from django.shortcuts import render
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from .serializers import UserRegistrationSerializer
from .serializers import LoginSerializer
from django.contrib.auth import authenticate
from rest_framework.authtoken.models import Token 
import logging

# Set up logging
logger = logging.getLogger(__name__)

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