import speech_recognition as sr
import os
from dotenv import load_dotenv
import cohere
from uagents import Agent, Context, Protocol, Model


load_dotenv()

api_key = os.getenv('COHERE_API_KEY')
co = cohere.Client(api_key)


def transcribe_audio(audio_data):
    recognizer = sr.Recognizer()
    try:
        recognized_text = recognizer.recognize_google(audio_data)  # Example using Google Speech Recognition
        return recognized_text
    except sr.UnknownValueError:
        print("Could not understand audio")
        return ""
    except sr.RequestError as e:
        print(f"Error fetching results from Google Speech Recognition service; {e}")
        return ""


def create_analysis_uagent(agent_name):
    # Replace with your Fetch.ai network details (assuming configured)
    context = Context(name="analysis_context")  # Replace with your context name (if needed)
    protocol = Protocol("tcp")
    model = Model("basic")
    analysis_agent = Agent(name=agent_name, context=context, protocol=protocol, model=model)
    return analysis_agent


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

