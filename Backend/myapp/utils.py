import asyncio
import speech_recognition as sr
from dotenv import load_dotenv
import cohere
import os
from uagents import Agent, Context, Protocol, Model

load_dotenv()

api_key = os.getenv('COHERE_API_KEY')
co = cohere.Client(api_key)

async def query_agent(audio_file_path):
    agent = Agent("MedicalTranscriptionAgent", port=8001)
    context = Context()
    protocol = Protocol("medical_transcription", version="1.0.0")
    model = Model("TranscriptRequest", audio_path=audio_file_path)
    
    try:
        response = await agent.query(context, protocol, model)
        return response.data.transcript, response.data.extracted_info
    except Exception as e:
        return str(e)

def transcribe_audio(audio_file_path):
    recognizer = sr.Recognizer()
    with sr.AudioFile(audio_file_path) as source:
        audio_data = recognizer.record(source)
    
    try:
        transcript = recognizer.recognize_google(audio_data, language="en-US")
        print("Transcription successful:", transcript)
        return transcript
    except sr.UnknownValueError:
        print("Speech Recognition could not understand audio")
        return "Speech Recognition could not understand audio please open in a new window"
    except sr.RequestError as e:
        print("Could not request results from Speech Recognition service; {0}".format(e))
        return ""

async def process_audio(audio_file_path):
    transcript = transcribe_audio(audio_file_path)
    extracted_info = ""
    
    if transcript:
        print("Transcription successful, querying agent...")
        extracted_info = await query_agent(audio_file_path)
    else:
        print("Transcription failed")
    
    return transcript, extracted_info

# # Example usage
# async def main():
#     audio_file_path = "path/to/audio/file.wav"
#     transcript, extracted_info = await process_audio(audio_file_path)
#     print("Transcript:", transcript)
#     print("Extracted info:", extracted_info)

asyncio.run(main())
