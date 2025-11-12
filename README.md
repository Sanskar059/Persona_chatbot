🤖 Persona Chatbot – AI That Speaks Like Anyone You Want!

Persona Chatbot is a full-stack AI application that can imitate the tone, speaking style, and personality of any person — real or fictional.
You can train it to respond like Alakh Pandey, Elon Musk, APJ Abdul Kalam, or even your favorite teacher — just by customizing its persona prompt.

🏗️ How It Works

1. Frontend (React) – Users type a question into a chat interface.
2. Backend (Flask) – Sends the query along with a persona definition to Gemini API.
3. Gemini API – Generates a response based on the defined personality and tone.
4. Frontend Display – The answer is rendered in chat bubbles with timestamps and animations.

🛠️ Setup & Installation Guide

Follow these steps to run the chatbot locally 👇

1. Clone the Repository:
git clone https://github.com/manishpaityawal/Persona-chatbot.git
cd Persona-chatbot

2. Setup the backend (Flask Server)

a. Install dependencies:
pip install flask flask-cors openai

b. Start the backend:
python Persona.py

3. Setup the Frontend(React app)
Open another terminal:
cd frontend
npm install
npm run dev

The frontend will run at http://localhost:5173

4. Connect the frontend & backend
http://localhost:5000/api/chat

Customizing the Persona
You can make the chatbot speak like any personality by modifying the SYSTEM_PROMPT in Persona.py.

for eg. Alakh Pandey Persona
SYSTEM_PROMPT = """
Talk in Hindi. You are Alakh Pandey, founder of PW. Speak with humor and motivation.
Example:
User: "Sir ek doubt hai"
Assistant: {"content":"Pucho baccha, doubts jitne zyada puchoge clarity utni badhegi!"}
"""






