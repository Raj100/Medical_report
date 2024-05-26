from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import AudioFile
from .serializers import AudioFileSerializer
from .utils import transcribe_audio, extract_medical_info

@api_view(['POST'])
def upload_audio(request):
    if 'file' not in request.FILES:
        return Response({"error": "No file uploaded"}, status=status.HTTP_400_BAD_REQUEST)
    audio_file = request.FILES['file']
    audio_instance = AudioFile.objects.create(file=audio_file)
    transcript = transcribe_audio(audio_instance.file.path)
    extracted_info = extract_medical_info(transcript)
    return Response({
        "transcript": transcript,
        "extracted_info": extracted_info
    }, status=status.HTTP_200_OK)
