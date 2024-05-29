import os
import speech_recognition as sr
from dotenv import load_dotenv
import cohere
from uagents import Agent, Context, Protocol, Model

load_dotenv()

api_key = os.getenv('COHERE_API_KEY')
co = cohere.Client(api_key)

def transcribe_audio(audio_file_path): # Define the transcribe_audio function
    recognizer = sr.Recognizer()
    with sr.AudioFile(audio_file_path) as source:
        audio_data = recognizer.record(source)
    try:
        transcript = recognizer.recognize_google(audio_data, language="en-US")
        return transcript # Return the transcript if the audio was successfully transcribed
    except sr.UnknownValueError:
        print("Could not understand audio")
        return "" # Return an empty string if the audio could not be understood
    except sr.RequestError as e:
        print(f"Error fetching results from Google Speech Recognition service; {e}")
        return "" # Return an empty string if there was an error fetching results from the Google Speech Recognition service


def extract_medical_info(transcript): # Define the extract_medical_info function
    prompt = f"""
Here is the transcription of the doctor-patient conversation:

{transcript}

Using the transcription above, organize the data into the following categories in a short, concise format:

## Appointment Notes:
- Reason for visit:
- Onset of symptoms:
- Palliating or Provoking Factors:
- Region Affected:
- Severity of Symptoms:
- Time course of symptoms:
- Follow-up plan:
- Physical Symptoms:
- Inferred summary by the doctor:

## History:
- Medical History:
- Surgery History:
- Family Medical History:
- Medication History:
- Social History:
- Known Allergies:
- Interaction with Sick People:
- Current Medication:
- Menstruation History:
- Lifestyle Changes in the Recent Past:
- List of Vaccinations:
- Dosages:
- Hospitalization:

## Vitals:
- Blood Pressure:
- Heart Rate:
- Respiratory Rate:
- Temperature:

Please format the output as follows:

Here is the information from the doctor-patient conversation organized into the requested categories:
    
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
    return response.generations[0].text.strip() # Return the generated response from the response

class TranscriptRequest(Model):
    audio_path: str

class TranscriptResponse(Model):
    transcript: str
    extracted_info: str

class ErrorResponse(Model):
    error: str

MedicalTranscriptionAgent = Agent(
    name="MedicalTranscriptionAgent",
    port=8000,
    seed="Medical Transcription Agent"
)

async def query_agent(audio_path: str) -> dict:
    """
    Query the agent with the given audio path.
    """
    try:
        transcript = transcribe_audio(audio_path)
        if transcript and 'Transcription error' not in transcript:
            extracted_info = extract_medical_info(transcript)
            return {'transcript': transcript, 'extracted_info': extracted_info}
        else:
            return {'agent_error': "No transcription available to extract information."}
    except Exception as e:
        return {'agent_error': f"Error in querying the agent: {str(e)}"}
