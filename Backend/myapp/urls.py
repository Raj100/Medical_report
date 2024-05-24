from django.urls import path
from .views import AudioFileUploadView

urlpatterns = [
    path('uploadFile/', AudioFileUploadView.as_view(), name='file-upload'),
]
