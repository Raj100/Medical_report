import os
import speech_recognition as sr
from dotenv import load_dotenv
import cohere
from uagents import Agent, Context, Protocol, Model

load_dotenv()

api_key = os.getenv('COHERE_API_KEY')
co = cohere.Client(api_key)

def transcribe_audio(audio_file_path):
    recognizer = sr.Recognizer()
    with sr.AudioFile(audio_file_path) as source:
        audio_data = recognizer.record(source)
    try:
        transcript = recognizer.recognize_google(audio_data, language="en-US")
        return transcript
    except sr.UnknownValueError:
        return ""
    except sr.RequestError as e:
        return ""

def extract_medical_info(transcript):
    prompt = f"""
    Here is the transcription of the doctor-patient conversation:

    {transcript}

    Using the transcription above, organize the data into the following categories in a short, concise format:

    ## Appointment Notes:
    - Reason for visit: [Reason for visit]
    - Onset of symptoms: [Onset of symptoms]
    - Palliating or Provoking Factors: [Palliating or Provoking Factors]
    - Region Affected: [Region Affected]
    - Severity of Symptoms: [Severity of Symptoms]
    - Time course of symptoms: [Time course of symptoms]
    - Follow-up plan: [Follow-up plan]
    - Physical Symptoms: [Physical Symptoms]
    - Inferred summary by the doctor: [Inferred summary by the doctor]

    ## History:
    - Medical History: [Medical History]
    - Surgery History: [Surgery History]
    - Family Medical History: [Family Medical History]
    - Medication History: [Medication History]
    - Social History: [Social History]
    - Known Allergies: [Known Allergies]
    - Interaction with Sick People: [Interaction with Sick People]
    - Current Medication: [Current Medication]
    - Menstruation History: [Menstruation History]
    - Lifestyle Changes in the Recent Past: [Lifestyle Changes in the Recent Past]
    - List of Vaccinations: [List of Vaccinations]
    - Dosages: [Dosages]
    - Hospitalization: [Hospitalization]

    ## Vitals:
    - Blood Pressure: [Blood Pressure]
    - Heart Rate: [Heart Rate]
    - Respiratory Rate: [Respiratory Rate]
    - Temperature: [Temperature]
    """
    response = co.generate(
        model='command-r-plus',
        prompt=prompt,
        max_tokens=300
    )
    return response.generations[0].text.strip()

class TranscriptRequest(Model):
    audio_path: str

class TranscriptResponse(Model):
    transcript: str
    extracted_info: str

class ErrorResponse(Model):
    error: str

MedicalTranscriptionAgent = Agent(
    name="MedicalTranscriptionAgent",
    port=8001,
    seed="Medical Transcription Agent"
)

@MedicalTranscriptionAgent.on_query(model=TranscriptRequest, replies={TranscriptResponse, ErrorResponse})
async def handle_transcription_request(ctx: Context, sender: str, request: TranscriptRequest):
    try:
        transcript = transcribe_audio(request.audio_path)
        extracted_info = extract_medical_info(transcript)
        await ctx.send(sender, TranscriptResponse(transcript=transcript, extracted_info=extracted_info))
    except Exception as e:
        await ctx.send(sender, ErrorResponse(error=str(e)))

if __name__ == "__main__":
    MedicalTranscriptionAgent.run()
