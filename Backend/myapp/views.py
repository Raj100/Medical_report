from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import AudioFile
from .serializers import AudioFileSerializer
from .utils import MedicalTranscriptionAgent
import os
import asyncio
from uagents.setup import fund_agent_if_low
from .utils import TranscriptRequest, TranscriptResponse, ErrorResponse

@api_view(['POST'])
def upload_audio(request):
    if 'file' not in request.FILES:
        return Response({"error": "No file uploaded"}, status=status.HTTP_400_BAD_REQUEST)
    
    audio_file = request.FILES['file']
    audio_instance = AudioFile.objects.create(file=audio_file)
    
    audio_file_path = audio_instance.file.path
    
    # Ensure the agent is funded
    fund_agent_if_low(MedicalTranscriptionAgent.wallet.address())
    
    loop = asyncio.new_event_loop()
    asyncio.set_event_loop(loop)

    async def query_agent():
        return await MedicalTranscriptionAgent.query(TranscriptRequest(audio_path=audio_file_path))

    response = loop.run_until_complete(query_agent())

    if isinstance(response, TranscriptResponse):
        return Response({
            "transcript": response.transcript,
            "extracted_info": response.extracted_info
        }, status=status.HTTP_200_OK)
    elif isinstance(response, ErrorResponse):
        return Response({"error": response.error}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    else:
        return Response({"error": "Unexpected response from agent"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
