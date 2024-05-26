from django.urls import path
from .views import upload_audio

urlpatterns = [
    path('upload/', upload_audio, name='upload_audio'),
]
