from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.decorators import api_view

from rest_framework import status
from rest_framework.views import APIView
from .serializers import TopPlayersSerializer, MatchSerializer, UserSerializer
from .models import User, Match

# Create your views here.

@api_view(['POST', 'GET'])
def helloWorld(response):
    return Response({"message": "Hello World this is my first django."})

class TopPlayersView(APIView):
    def get(self, request):
        try:
            top_players = User.objects.order_by('-high_score')[:5]
            serializer = TopPlayersSerializer(top_players, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({'ERROR': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class NewUserDataView(APIView):
    def post(self, request):
        try:
            user = UserSerializer(data = request.data, many = False)
            if user.is_valid():
                user.save()
                res = Response(
                    user.data,
                    status = status.HTTP_201_CREATED)
                
                return res
            else:
                return Response(user.errors, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            return Response({'ERROR': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class LoginUserView(APIView):
    def post(self, request):
        email = request.data.get('email')
        password = request.data.get('password')

        if email is None or password is None:
            return Response({'ERROR' : "Mail or Password field is empty"}, status = status.HTTP_400_BAD_REQUEST)

        user = User.objects.get(email = email)

        if user is None:
           return Response({'ERROR' : "No user by that mail"}, status = status.HTTP_404_NOT_FOUND)
        
        if user.password != password:
            return Response({'ERROR' : "Incorrect Password or User Mail"}, status = status.HTTP_406_NOT_ACCEPTABLE)
        
        res = Response({
            "message" : "Logged in successfully",
            "user_id" : user.id,
            "name" : user.name
        }, status = status.HTTP_202_ACCEPTED)

        res.set_cookie(key = 'user_id', value = user.id, httponly = True)

        return res

class NewMatchDataView(APIView):
    def post(self, request):
        print(request.data)
        try:
            user_id= int(request.data["user_id"])
            target_hit = int(request.data["target_hit"])
            score = float(request.data["score"])
            accuracy = float(request.data["accuracy"])
            data = {
                 "user_id": user_id,
                 "target_hit": target_hit,
                 "score": score,
                 "accuracy": accuracy,
             }
            new_match_data = MatchSerializer(data = data, many = False)
            if new_match_data.is_valid():
                new_match = new_match_data.save()

                user = new_match.user_id

                if new_match.score > user.high_score:
                    user.high_score = new_match.score
                    user.save()
                    print("High score updated")

                return Response(new_match_data.data, status = status.HTTP_201_CREATED)
            else:
                return Response(new_match_data.errors, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            return Response({'ERROR': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
         
class UserProgressionView(APIView):
    def post(self, request):
        user_id = request.COOKIES.get('user_id')
        if user_id is None:
            return Response({'ERROR' : "Please Login"}, status = status.HTTP_401_UNAUTHORIZED)
        user = User.objects.get(id = user_id)

        if user is None:
            return Response({'ERROR' : "Unauthorized Access"}, status = status.HTTP_401_UNAUTHORIZED)

        matches = Match.objects.filter(user_id = user_id).order_by('-time_stamp')[:10]

        if not matches.exists():
            return Response([], status=status.HTTP_204_NO_CONTENT)

        serializer = MatchSerializer(matches, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
