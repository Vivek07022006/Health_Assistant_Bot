from flask import Flask, request, jsonify
from flask_cors import CORS
import google.generativeai as genai
import os

app = Flask(__name__)
CORS(app)

# Configure Gemini
genai.configure(api_key=os.getenv("GEMINI_API_KEY"))

# Load model
model = genai.GenerativeModel("gemini-1.5-flash")

system_prompt = (
    "You are HealthCareBot, a helpful assistant who ONLY provides "
    "answers related to health, wellness, fitness, medical awareness, "
    "mental health, diet, and healthy lifestyle. "
    "If the user asks about anything outside of healthcare, "
    "you must respond with exactly: "
    "\"Sorry, I don’t have access to other resources, I’m a Health care bot.\""
)

@app.route("/chat", methods=["POST"])
def chat():
    user_message = request.json.get("message", "")

    try:
        full_prompt = f"{system_prompt}\n\nUser: {user_message}\nHealthCareBot:"
        response = model.generate_content(full_prompt)

        # ✅ Safely extract Gemini output
        reply = None
        if hasattr(response, "text") and response.text:
            reply = response.text.strip()
        elif hasattr(response, "candidates") and response.candidates:
            parts = response.candidates[0].content.parts
            if parts and hasattr(parts[0], "text"):
                reply = parts[0].text.strip()

        if not reply:
            reply = "Sorry, I couldn’t generate a response this time."

        print(f"\nUSER: {user_message}\nBOT: {reply}\n")  # Debug log

        return jsonify({"response": reply})

    except Exception as e:
        print("Error in /chat:", e)
        return jsonify({"reply": f"Oops! Something went wrong: {str(e)}"}), 500


if __name__ == "__main__":
    app.run(debug=True)
