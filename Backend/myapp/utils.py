# my_app/utils.py
import speech_recognition as sr
import spacy

def transcribe_audio(audio_file_path):
    """
    Transcribes audio from the given file path using SpeechRecognition library.
    Returns the transcription text.
    """
    recognizer = sr.Recognizer()
    with sr.AudioFile(audio_file_path) as source:
        audio_data = recognizer.record(source)  # Record the audio file
    try:
        transcript = recognizer.recognize_google(audio_data, language="en-US")
        return transcript
    except sr.UnknownValueError:
        print("Could not understand audio")
        return ""
    except sr.RequestError as e:
        print("Error fetching results from Google Speech Recognition service; {0}".format(e))
        return ""

def extract_medical_info(transcript):
    """
    Extracts medical information from the given transcription text using a pre-trained NLP model.
    Returns a dictionary containing categorized medical information.
    """
    nlp = spacy.load("en_core_sci_sm")

    doc = nlp(transcript)

    categories = {
        "Primary care physician": [],
        "Medical history": [],
        "Surgery history": [],
        "Family medical history": [],
        "Medication history": [],
        "Social History": [],
        "Known Allergies": [],
        "Interaction detail with sick people": [],
        "Current medication": [],
        "Menstruation history": [],
        "Lifestyle changes in the recent past": [],
        "List of vaccinations": [],
        "Dosages": [],
        "Hospitalization": [],
        "Blood pressure": [],
        "Heart rate": [],
        "Respiratory rate": [],
        "Temperature": [],
        "Health Insurance Info": [],
        "Reason for visit": [],
        "Onset of symptoms": [],
        "Palliating or Provoking Factors": [],
        "Region Affected": [],
        "Severity of Symptoms": [],
        "Time course of symptoms": [],
        "Follow up plan": [],
        "Physical Symptoms": [],
        "Inferred summary by the doctor": []
    }

    for ent in doc.ents:
        if ent.label_ in categories:
            categories[ent.label_].append(ent.text)

    return categories
