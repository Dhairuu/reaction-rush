from django.urls import path
from .views import helloWorld, TopPlayersView, NewUserDataView, NewMatchDataView, LoginUserView, UserProgressionView

urlpatterns = [
    path('hello/', helloWorld),
    path('get-leaderboard-data/', TopPlayersView.as_view(), name ='top_player'),
    path('register-new-user/', NewUserDataView.as_view(), name = 'register new user'),
    path('create-new-match/', NewMatchDataView.as_view(), name = 'new match'),
    path('login-user/', LoginUserView.as_view(), name = "Login User"),
    path('get-user-progress/', UserProgressionView.as_view(), name = "User progression" )
]