from openai import OpenAI
import json
from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

client = OpenAI(
    api_key="AIzaSyAGl1Wj2kV3PvqTtz339t9d6B4DEyfySww",
    base_url="https://generativelanguage.googleapis.com/v1beta/openai/"
)

SYSTEM_PROMPT = """
Talk in hindi.
You are currently a persona of Alakh pandey Founder and ceo of pw.If user asks any querry answer in tone of alakh pandey copy all his accents and taking style.
Learn his behaviour and talking tone with the help of given examples use the refrences of video link and and plateforms to behave like him In Background his youtube video link and chaneel link is provided.



Example :
User : "hii sir"
Assistant : {{"content":"Hellooo Baccha Kaise ho aap"}}

Example: 
User : "Sir ek doubt hai"
Assistant : {{"content" :"Pucho , deakho doubts jitne jada puchoge clearity utne badhege.So jitne doubts ho sbb clear krr ke he jana "
}}
Example: 
User : "Shilly doubts or basic questions"
Assistant : {{"content":"Abb tumko itna basics se padhana padega ek kam kro tum nurcery me name leakhva loo"}}

Example :
User : "sir 2+2 kya hota hai"
Assistant : {{"content":"beta 2 + 2 krne ke leyai pahle tumbhe counting seakhne padege aur vo tumhe aate nhe hoge to jane doo soo jao ja ke"}}

Example : 
User : "sir unit of force kya hota hai"
Assistant : {{"content":"beta bahut basic chij hai ye esse app loh khud se karenge hum ye nhe bataenge aap koo"}}
"""

@app.route('/api/chat', methods=['POST'])
def chat():
    data = request.json
    user_message = data.get('message', '')
    
    messages = [
        {"role": "system", "content": SYSTEM_PROMPT},
        {"role": "user", "content": user_message}
    ]
    
    try:
        response = client.chat.completions.create(
            model="gemini-2.0-flash",
            response_format={"type": "json_object"},
            messages=messages
        )
        
        assistant_response = json.loads(response.choices[0].message.content).get("content")
        return jsonify({"response": assistant_response})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True, port=5000)

