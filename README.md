# authentication

The authenticatin project is a fullstack application that looks to combine the power of our client side react program and django as the RESTful api to authenticate users.

## Project Setup

### virtual environment

The application is developed on my local machine therefore we will be setting up first a `virtualenv` that will keep all the installed modules needed to run our program.

```bash
- pip install virtualenv
- virtualenv env
- source env/bin/activate
```

### Django Project and App Installation

Setting up our backend application

```bash
- pip install django
- mkdir backend
- cd backend
- django-admin startproject backend .
- python manage.py startapp base
```

include newly installed app `base` in django _settings.py_ file `installed_apps`
create our API endpoint `api` within the `base` app and initialize it.
then create _views.py_, _urls.py_, _serializers.py_ in it.

### Django restframework Installation

https://www.django-rest-framework.org/#installation

Setting up our API

```bash
- pip install djangorestframework
```

include newly installed app `rest_framework` in django _settings.py_ file `installed_apps`

- settings.urls.py

```
from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    ...,
    path('api/', include('base.api.urls'))
]
```

- base.api.urls.py

```
from django.urls import path
from . import views

urlpatterns = [
    path('', views.getRoutes)
]
```

- base.api.views.py

```
from  rest_framework.response import Response
from rest_framework.decorators import api_view

@api_view(['GET'])
def getRoutes(request):
    routes = [
        '/api/token',
        '/api/token/refresh'
    ]
    return Response(routes)
```

```bash
- python manage.py migrate
- python manage.py runserver
```
