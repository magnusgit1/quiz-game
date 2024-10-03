
from django.urls import include, path
from .views import UserRegistrationView, LoginView, LogoutView, QuestionListAPI

from rest_framework_simplejwt.views import TokenObtainPairView,TokenRefreshView

urlpatterns = [
    path('register/', UserRegistrationView.as_view(), name='user-register'),
    path('auth/', include('dj_rest_auth.urls')),
    path('login/', LoginView.as_view(), name='login'),
    path('questions/', QuestionListAPI.as_view(), name='questions'),
    path('logout/', LogoutView.as_view(), name='logout'),
]