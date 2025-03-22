from fastapi import FastAPI
from pydantic import BaseModel
import logging
from groq import Groq  # Use your Groq client library

app = FastAPI()

# Enable CORS if needed (not shown here but recommended for production)
# ...

# Groq API Key (store securely in production)
GROQ_API_KEY = "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"
groq_client = Groq(api_key=GROQ_API_KEY)

# Request model for resume processing
class ResumeRequest(BaseModel):
    conversation_history: str

# Request model for follow-up questions
class ResumeFollowUpRequest(BaseModel):
    conversation_history: str

def query_groq_resume(conversation_history):
    try:
        messages = [
            {
                "role": "system",
                "content": (
                    "You are an AI assistant responsible for answering questions about the resume. "
                    "Based on the conversation history provided (which includes the extracted resume text), "
                    "generate a detailed summary and answers regarding the candidate's skills, experience, and education."
                )
            },
            {
                "role": "user",
                "content": f"Conversation History: {conversation_history}"
            }
        ]
        response = groq_client.chat.completions.create(messages=messages, model="llama-3.3-70b-versatile")
        return response.choices[0].message.content
    except Exception as e:
        logging.error(f"Error in query_groq_resume: {str(e)}")
        return {"error": "Failed to generate resume answer"}

def query_groq_follow_up_questions(conversation_history):
    try:
        messages = [
            {
                "role": "system",
                "content": (
                    "You are an AI assistant responsible for generating follow-up questions based on the conversation history "
                    "about the resume. Provide context-aware answers."
                )
            },
            {
                "role": "user",
                "content": f"Conversation History: {conversation_history}"
            }
        ]
        response = groq_client.chat.completions.create(messages=messages, model="llama-3.3-70b-versatile")
        return response.choices[0].message.content
    except Exception as e:
        logging.error(f"Error in query_groq_follow_up_questions: {str(e)}")
        return {"error": "Failed to generate follow-up question"}

@app.post("/ai_resume/")
async def ai_resume(request: ResumeRequest):
    resume = query_groq_resume(request.conversation_history)
    return {"resume": resume}

@app.post("/ai_followup/")
async def ai_followup_questions(request: ResumeFollowUpRequest):
    follow_up = query_groq_follow_up_questions(request.conversation_history)
    return {"follow_up_question": follow_up}

# To run the FastAPI app:
# uvicorn app:app --reload
