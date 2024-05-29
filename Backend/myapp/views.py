import asyncio
from asgiref.sync import async_to_sync
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import AudioFile
from .utils import agent

@api_view(['POST'])
def upload_audio(request):
    if 'file' not in request.FILES:
        return Response({"error": "No file uploaded"}, status=status.HTTP_400_BAD_REQUEST)
    
    audio_file = request.FILES['file']
    audio_instance = AudioFile.objects.create(file=audio_file)
    
    transcript = async_to_sync(transcribe_audio_with_agent)(audio_instance.file.path)
    print(transcript)
    
    extracted_info = {}
    
    try:
        if transcript and 'Transcription error' not in transcript:
            medical_info = async_to_sync(extract_medical_info_with_agent)(transcript)
            extracted_info['medical_info'] = medical_info
    except Exception as e:
        extracted_info['medical_info_error'] = f"Medical info extraction error: {str(e)}"

    return Response({
        "transcript": transcript,
        "extracted_info": extracted_info
    }, status=status.HTTP_200_OK)

async def transcribe_audio_with_agent(audio_file_path):
    context = {"audio_file_path": audio_file_path}
    response = await agent.handle("transcribe_audio", context)
    return response.get('transcript', 'Transcription error')

async def extract_medical_info_with_agent(transcript):
    context = {"transcript": transcript}
    response = await agent.handle("extract_medical_info", context)
    return response.get('medical_info', 'Medical info extraction error')
