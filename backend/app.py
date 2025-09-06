from flask import Flask, request, jsonify
from flask_cors import CORS
import os
import requests
import google.generativeai as genai
from dotenv import load_dotenv

# Load .env
load_dotenv()

app = Flask(__name__)
CORS(app)

# ==========================
# 🔹 GEMINI CONFIG
# ==========================
genai.configure(api_key=os.getenv("GEMINI_API_KEY"))
model = genai.GenerativeModel("gemini-1.5-flash")

system_prompt = (
    "You are HealthCareBot, a helpful assistant who ONLY provides "
    "answers related to health, wellness, fitness, medical awareness, "
    "mental health, diet, and healthy lifestyle. "
    "You will respond in a friendly and helpful way. "
    "If the user asks 'who are you' or 'what can you do', "
    "you must say: 'I am HealthCareBot, your personal health assistant. "
    "I can help you with any health-related questions.' "
    "If the user asks 'who created you' or 'who is your creator', "
    "you must say: 'I was created by Vivek S, a passionate developer dedicated to health tech.' "
    "If the user asks about anything outside of healthcare, "
    "you must respond with exactly: "
    "\"Sorry, I don’t have access to other resources, I’m a Health care bot.\""
)

# ==========================
# 🔹 HUGGINGFACE FALLBACK CONFIG
# ==========================
HF_API_KEY = os.getenv("HF_API_KEY")
HF_API_URL = "https://api-inference.huggingface.co/models/facebook/blenderbot-400M-distill"
HF_HEADERS = {"Authorization": f"Bearer {HF_API_KEY}"}

chat_history = []
health_keywords = [
    "health", "fitness", "diet", "medicine", "doctor", "hospital",
    "symptom", "treatment", "disease", "mental health", "wellness",
    "nutrition", "exercise", "yoga", "diabetes", "blood pressure"
]

def is_health_related(user_input: str) -> bool:
    user_input = user_input.lower()
    return any(keyword in user_input for keyword in health_keywords)

def hf_query(payload):
    response = requests.post(HF_API_URL, headers=HF_HEADERS, json=payload)
    return response.json()

def get_hf_response(user_input):
    """ HuggingFace backup bot response """
    if not is_health_related(user_input):
        return "Sorry, I don’t have access to other resources, I’m a Health care bot."

    chat_history.append(user_input)

    data = hf_query({
        "inputs": {
            "past_user_inputs": chat_history[:-1],
            "generated_responses": [],
            "text": user_input
        }
    })

    try:
        bot_reply = data['generated_text']
    except:
        bot_reply = "Sorry, I’m having trouble right now."

    chat_history.append(bot_reply)
    return bot_reply

# ==========================
# 🔹 CHAT ENDPOINT
# ==========================
@app.route("/chat", methods=["POST"])
def chat():
    user_message = request.json.get("message", "")

    # Default reply
    reply = None

    try:
        # Try Gemini first
        full_prompt = f"{system_prompt}\n\nUser: {user_message}\nHealthCareBot:"
        response = model.generate_content(full_prompt)

        if hasattr(response, "text") and response.text:
            reply = response.text.strip()
        elif hasattr(response, "candidates") and response.candidates:
            parts = response.candidates[0].content.parts
            if parts and hasattr(parts[0], "text"):
                reply = parts[0].text.strip()

    except Exception as e:
        print("⚠️ Gemini Error:", e)

    # Fallback to HuggingFace if Gemini fails
    if not reply:
        reply = get_hf_response(user_message)

    print(f"\nUSER: {user_message}\nBOT: {reply}\n")  # Debug log
    return jsonify({"response": reply})


# ==========================
# 🔹 TEST ENDPOINT
# ==========================
@app.route("/test", methods=["GET"])
def test():
    return jsonify({"status": "ok", "message": "Flask server running!"})


# ==========================
# 🔹 MAIN
# ==========================
if __name__ == "__main__":
    app.run(debug=True)
