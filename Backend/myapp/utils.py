import speech_recognition as sr
import cohere

api_key = 'ApzrdoGPGL8J67z6D5OSWLuS1QntWPBRzvA4xx44'
co = cohere.Client(api_key)

def transcribe_audio(audio_file_path):
    recognizer = sr.Recognizer()
    with sr.AudioFile(audio_file_path) as source:
        audio_data = recognizer.record(source)
    try:
        transcript = recognizer.recognize_google(audio_data, language="en-US")
        return transcript
    except sr.UnknownValueError:
        print("Could not understand audio")
        return ""
    except sr.RequestError as e:
        print(f"Error fetching results from Google Speech Recognition service; {e}")
        return ""

def extract_medical_info(transcript):
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

    return response.generations[0].text.strip()
