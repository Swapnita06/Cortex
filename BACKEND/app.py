import os
import json
import threading
import time
from datetime import datetime, timedelta
from flask import Flask, request, jsonify
from flask_cors import CORS
import autogen

# Initialize Flask app
app = Flask(__name__)
CORS(app)

# Configuration file paths
CONFIG_FILE_PATH = "OAI_CONFIG_LIST.json"
CUSTOM_MODELS_FILE_PATH = "custom_models.json"

# Define the save_custom_models function
def save_custom_models(custom_models, custom_models_file_path):
    existing_models = load_custom_models(custom_models_file_path)
    existing_models.extend(custom_models)
    
    with open(custom_models_file_path, 'w') as file:
        json.dump(existing_models, file, default=str, indent=2)

# Load custom models from JSON file
def load_custom_models(custom_models_file_path):
    try:
        if os.path.exists(custom_models_file_path):
            with open(custom_models_file_path, 'r') as file:
                return json.load(file)
    except json.decoder.JSONDecodeError:
        pass  # Handle this exception as needed
    return []

# Initialize predefined agents
agents = {
    "wellness_consultant": autogen.AssistantAgent(
        name="Wellness Consultant",
        llm_config={"config_list": autogen.config_list_from_json(CONFIG_FILE_PATH), "seed": 42},
        max_consecutive_auto_reply=10,
        description="Analyze the given symptoms and health data to provide personalized wellness tips and recommendations.",
    ),
    "investment_advisor": autogen.AssistantAgent(
        name="Investment Advisor",
        system_message="Creative in software product ideas.",
        llm_config={"config_list": autogen.config_list_from_json(CONFIG_FILE_PATH), "seed": 42},
        max_consecutive_auto_reply=10,
        description="Evaluate the provided financial data to offer insightful investment advice and risk assessments",
    ),
    "scientist": autogen.AssistantAgent(
        name="Scientist",
        llm_config={"config_list": autogen.config_list_from_json(CONFIG_FILE_PATH), "seed": 42},
        max_consecutive_auto_reply=10,
        description="Good at scientific research and analysis and providing scientifically proven solutions and strategies",
    ),
    "personal_trainer": autogen.AssistantAgent(
        name="Personal Trainer",
        llm_config={"config_list": autogen.config_list_from_json(CONFIG_FILE_PATH), "seed": 42},
        max_consecutive_auto_reply=10,
        description="Create customized fitness routines and nutrition plans tailored to individual health goals and preferences.",
    ),
    "event_coordinator": autogen.AssistantAgent(
        name="Event Coordinator",
        llm_config={"config_list": autogen.config_list_from_json(CONFIG_FILE_PATH), "seed": 42},
        max_consecutive_auto_reply=10,
        description="Organize and manage events, including logistics, coordination, and execution, to ensure a seamless and memorable experience.",
    ),
    "writer": autogen.AssistantAgent(
        name="Writer",
        llm_config={"config_list": autogen.config_list_from_json(CONFIG_FILE_PATH), "seed": 42},
        max_consecutive_auto_reply=10,
        description="Channels creativity and insight to craft compelling narratives and use words to evoke emotions and transport readers into new worlds.",
    ),
    "travel_coordinator": autogen.AssistantAgent(
        name="Travel Coordinator",
        llm_config={"config_list": autogen.config_list_from_json(CONFIG_FILE_PATH), "seed": 42},
        max_consecutive_auto_reply=10,
        description="Plan and organize travel itineraries, including accommodations and activities,to create optimal travel experiences.",
    ),
    "creative_content_strategists": autogen.AssistantAgent(
        name="Creative Content Strategists",
        llm_config={"config_list": autogen.config_list_from_json(CONFIG_FILE_PATH), "seed": 42},
        max_consecutive_auto_reply=10,
        description="Generate creative and innovative content ideas and strategies suitable for various media platforms.",
    ),
    "news_editor": autogen.AssistantAgent(
        name="News Editor",
        llm_config={"config_list": autogen.config_list_from_json(CONFIG_FILE_PATH), "seed": 42},
        max_consecutive_auto_reply=10,
        description="Summarize and present the latest news stories in an engaging and informative manner.",
    ),
}

# Endpoint to fetch all models
@app.route("/models", methods=["GET"])
def get_all_models():
    predefined_models = [{"name": agent.name, "description": agent.description} for agent in agents.values()]
    custom_models = load_custom_models(CUSTOM_MODELS_FILE_PATH)
    custom_model_descriptions = [{"name": model["name"], "description": model["description"]} for model in custom_models]
    return jsonify({"predefined_models": predefined_models, "custom_models": custom_model_descriptions})

# Endpoint to create a new custom model
@app.route("/create_model", methods=["POST"])
def api_create_model():
    data = request.json
    model_name = data.get("name")
    model_description = data.get("description")

    # Create a new custom model
    custom_model = {
        "name": model_name,
        "description": model_description,
        "created_at": datetime.now().isoformat(),
    }

    # Append the new custom model to the existing ones and save
    save_custom_models([custom_model], CUSTOM_MODELS_FILE_PATH)

    return jsonify({"message": f"Custom model '{model_name}' created successfully!"})

# Background task to remove expired custom models
def remove_expired_models():
    while True:
        now = datetime.now()
        custom_models = load_custom_models(CUSTOM_MODELS_FILE_PATH)
        custom_models = [model for model in custom_models if now - datetime.fromisoformat(model["created_at"]) < timedelta(minutes=1)]
        save_custom_models(custom_models, CUSTOM_MODELS_FILE_PATH)
        time.sleep(108000)  # Sleep for 3 hours

# Start the background thread to remove expired models
threading.Thread(target=remove_expired_models, daemon=True).start()

# Run the Flask application
if __name__ == "__main__":
    app.run(debug=False, host='0.0.0.0', port=5000)
