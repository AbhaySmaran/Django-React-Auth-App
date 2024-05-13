from django.urls import path
from .views import *

urlpatterns = [
    path('register/',UserRegistrationView.as_view(),name='registration'),
    path('login/', UserLoginView.as_view(), name='login'),
    path('profile/',UserProfileView.as_view(),name='profile'),
    path('changepassword/', UserChangePasswordView.as_view(),name= 'changePassword'),
    path('send-reset-password-email/',SendPasswordResetEmailView.as_view(),name='reset-password-email'),
    path('password-reset/<uid>/<token>/', UserResetPasswordView.as_view(),name='reset-password'),
]