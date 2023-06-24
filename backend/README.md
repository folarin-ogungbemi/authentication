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

include newly installed app `'base',` in django _settings.py_ file `installed_apps`
create our API endpoint `api` within the `base` app and initialize it.
then create _views.py_, _urls.py_, _serializers.py_ in it.

### Django restframework Installation

https://www.django-rest-framework.org/#installation

Setting up our API

```bash
- pip install djangorestframework
```

include newly installed app `'rest_framework',` in django _settings.py_ file `installed_apps`

- auth_system.urls.py

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

### DRF Authentication JWT

https://www.django-rest-framework.org/api-guide/authentication/#json-web-token-authentication

- simplejwt github :
  https://github.com/jazzband/djangorestframework-simplejwt
- simplejwt latest docs installation procedure :
  https://django-rest-framework-simplejwt.readthedocs.io/en/latest/getting_started.html#requirements

Running simplejwt module as a script

```bash
- python -m pip install djangorestframework-simplejwt
```

configure the installed the library in settings.py

- settings.py

```
REST_FRAMEWORK = {
    'DEFAULT_AUTHENTICATION_CLASSES': (
        'rest_framework_simplejwt.authentication.JWTAuthentication',
    )
}
```

To be able to _access and refresh tokens_ for our authenticatication

- base.api.urls.py

```
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

urlpatterns = [
    ...
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    ...
]
```

We can get our user `token` after _creating a user_ and login in through the path `http://.../api/token`

```bash
python manage.py createsuperuser
```

to get the information about the generated token by simplejwt visit https://jwt.io/ and paste the generated token in the `encoded` section to view also the expiration date, the user_id etc .. in the `payload` section. we can customize this token claims here https://django-rest-framework-simplejwt.readthedocs.io/en/latest/customizing_token_claims.html

#### Customizing our JWT

- the initial access token expires after 5mins
- the `REFRESH_TOKEN_LIFETIME` is set to `90days` so that as long as the user is not inactive for 90days straight the _access token_ can be regenerated so the user can be kept logged in.
- the `ROTATE_REFRESH_TOKENS` is set to `True` so that when the user is logged out a new refresh token is generated for another 90days, however, the old refresh token is still active. This may be a security loophole for our application, therefore we need to blacklist the old refresh token that has not reached the 90day inactivity.
- Next we have to set `BLACKLIST_AFTER_ROTATION` to `True` and add `rest_framework_simplejwt.token_blacklist` to our `installed_apps` in _settings.py_.

```
from datetime import timedelta

SIMPLE_JWT = {
    "ACCESS_TOKEN_LIFETIME": timedelta(minutes=5),
    "REFRESH_TOKEN_LIFETIME": timedelta(days=90),
    "ROTATE_REFRESH_TOKENS": True,
    "BLACKLIST_AFTER_ROTATION": True,
}
```

to add the database table `'rest_framework_simplejwt.token_blacklist',`

```bash
python manage.py migrate
```

#### Customize Token Claims

We want to get the additional information of the user besides its `user_id`.
To achieve this we can customize the the `TokenObtainPairView` by creating `MyTokenObtainPairView` and specify which additional information of the user we like to get `token['username] = user.username` this token is then returned

- base.api.views.py

```
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView

class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        # Add custom claims
        token['username'] = user.username

        return token

class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer
```

- base.api.urls.py

import the customized version

```
from .views import MyTokenObtainPairView
from rest_framework_simplejwt.views import (
    # remove TokenObtainPairView
    TokenRefreshView,
)

urlpatterns = [
    ...
    path('token/', MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    ...
]
```

### CORS Configuration

The Cross Origin Resource Sharing is necessary for our project since we will be making a sending HTTP request from the client (React=3000) which has a different PORT as to the server (Django=8000) so that Django can recognize and allow React to connect and avoid CORS error.

https://github.com/adamchainz/django-cors-headers

```bash
python -m pip install django-cors-headers
```

include newly installed app `'corsheaders',` in django _settings.py_ file `installed_apps`

update our `MIDDLEWARE` in project _settings.py_

```bash
MIDDLEWARE = [
    ...,
    'corsheaders.middleware.CorsMiddleware',
    ...,
]
```

we can specify explicitly the origins that should be allowed. There is also the option of allowing all origins. by default is false

```bash
CORS_ALLOW_ALL_ORIGINS = True
```
