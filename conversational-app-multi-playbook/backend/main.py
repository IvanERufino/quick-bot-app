from fastapi import FastAPI, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from src.controller.chats import router as chat_router
from src.controller.intents import router as intent_router
from src.controller.models import router as model_router
from google.cloud import speech
from os import getenv



app = FastAPI()

def configure_cors(app):
    url = getenv("FRONTEND_URL")
    if not url:
        raise ValueError("FRONTEND_URL environment variable not set")

    app.add_middleware(
        CORSMiddleware,
        allow_origins=[url],
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )

# Create a route to handle GET requests on root
@app.get("/")
async def root():
    return 'You are calling Quick Bot Backend'

# Create a route to handle GET requests on /version
@app.get("/api/version")
def version():
    return 'v0.0.1'

@app.post("/api/audio_chat")
async def audio_chat(audio_file: UploadFile = File(...)):
    client = speech.SpeechClient()
    audio_content = await audio_file.read()
    audio = speech.RecognitionAudio(content=audio_content)
    config = speech.RecognitionConfig(
        language_code="en-US",
        sample_rate_hertz=48000,
        model="default",
        audio_channel_count=1,
        enable_word_confidence=True,
        enable_word_time_offsets=True,
    )

    operation = client.long_running_recognize(config=config, audio=audio)

    print("Waiting for operation to complete...")
    response = operation.result(timeout=90)
    print(response)

    text = ""
    for result in response.results:
        print("Transcript: {}".format(result.alternatives[0].transcript))
        text = result.alternatives[0].transcript

    return text, 200

configure_cors(app)

app.include_router(chat_router)
app.include_router(intent_router)
app.include_router(model_router)