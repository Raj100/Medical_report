import asyncio
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import AudioFile
from .utils import transcribe_audio, query_agent, extract_medical_info
from .serializers import AudioFileSerializer

@api_view(['POST'])
def upload_audio(request):
    if 'file' not in request.FILES:
        return Response({"error": "No file uploaded"}, status=status.HTTP_400_BAD_REQUEST)
    
    audio_file = request.FILES['file']
    audio_instance = AudioFile.objects.create(file=audio_file)
    transcript = transcribe_audio(audio_instance.file.path)
    extracted_info = {}
    try:
        agent_response = asyncio.run(query_agent(audio_instance.file.path))
        if isinstance(agent_response, dict):
            extracted_info.update(agent_response)
        else:
            extracted_info['agent_error'] = agent_response
    except Exception as e:
        extracted_info['agent_error'] = f"Agent query error: {str(e)}"
    
    try:
        if transcript and 'Transcription error' not in transcript:
            medical_info = extract_medical_info(transcript)
            extracted_info['medical_info'] = medical_info
    except Exception as e:
        extracted_info['medical_info_error'] = f"Medical info extraction error: {str(e)}"

    transcript = transcribe_audio(audio_instance.file.path)
    extracted_info = extract_medical_info(transcript)

    return Response({
        "transcript": transcript,
        "extracted_info": extracted_info
    }, status=status.HTTP_200_OK)




