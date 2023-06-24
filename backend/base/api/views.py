from django.http import JsonResponse
# import the response to give us a decorated response to our endpoint
from  rest_framework.response import Response
# to use the Response method
from rest_framework.decorators import api_view

@api_view(['GET'])
def getRoutes(request):
    routes = [
        '/api/token',
        '/api/token/refresh'
    ]
    # safe implies we can render out enter more than just a python dictionary
    return Response(routes)