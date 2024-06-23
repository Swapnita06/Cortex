import os
import json
import threading
import time
from datetime import datetime, timedelta
from flask import Flask, request, jsonify
from flask_cors import CORS
import autogen
from autogen import AssistantAgent, UserProxyAgent, GroupChat, GroupChatManager

app = Flask(__name__)
CORS(app)

# Configuration file path
CONFIG_FILE_PATH = "OAI_CONFIG_LIST.json"

# Load configuration list from a JSON file
def load_config_list(config_file_path):
    return autogen.config_list_from_json(config_file_path)

# Create an AssistantAgent model based on user input for name and description
def create_model(name, description):
    config_list = load_config_list(CONFIG_FILE_PATH)
    seed = 42

    return autogen.AssistantAgent(
        name=name.lower(),  # Convert name to lowercase
        llm_config={
            "config_list": config_list,
            "seed": seed,
        },
        max_consecutive_auto_reply=10,
        description=description,
    )

# Initiate a single chat interaction with the selected agent
def initiate_single_chat(agent, message):
    user_proxy = autogen.UserProxyAgent(
        name="User_proxy",
        code_execution_config={"last_n_messages": 20, "work_dir": "coding", "use_docker": False},
        human_input_mode="NEVER",
        is_termination_msg=lambda x: autogen.code_utils.content_str(x.get("content")).find("TERMINATE") >= 0,
        description="I stand for the user and can run code.",
    )

    groupchat = autogen.GroupChat(agents=[user_proxy, agent], messages=[], max_round=12)
    manager = autogen.GroupChatManager(
        groupchat=groupchat,
        llm_config=agent.llm_config,
        is_termination_msg=lambda x: autogen.code_utils.content_str(x.get("content")).find("TERMINATE") >= 0,
    )
    
    user_proxy.initiate_chat(manager, message=message)
    responses = [msg["content"] for msg in groupchat.messages]
    return responses

# Initiate a group chat interaction with the selected agents
def initiate_group_chat(agents, message):
    user_proxy = autogen.UserProxyAgent(
        name="User_proxy",
        code_execution_config={"last_n_messages": 20, "work_dir": "coding", "use_docker": False},
        human_input_mode="NEVER",
        is_termination_msg=lambda x: autogen.code_utils.content_str(x.get("content")).find("TERMINATE") >= 0,
        description="I stand for the user and can run code.",
    )

    groupchat = autogen.GroupChat(agents=[user_proxy] + agents, messages=[], max_round=12)
    manager = autogen.GroupChatManager(
        groupchat=groupchat,
        llm_config=agents[0].llm_config,  # Assuming all agents have the same llm_config
        is_termination_msg=lambda x: autogen.code_utils.content_str(x.get("content")).find("TERMINATE") >= 0,
    )
    
    user_proxy.initiate_chat(manager, message=message)
    responses = [msg["content"] for msg in groupchat.messages]
    return responses

# Predefined agents
agents = {
    "wellness_consultant": AssistantAgent(
        name="Wellness Consultant",
        llm_config={"config_list": load_config_list(CONFIG_FILE_PATH), "seed": 42},
        max_consecutive_auto_reply=10,
        description="Analyze the given symptoms and health data to provide personalized wellness tips and recommendations.",
    ),
    "investment_advisor": AssistantAgent(
        name="Investment Advisor",
        system_message="Creative in software product ideas.",
        llm_config={"config_list": load_config_list(CONFIG_FILE_PATH), "seed": 42},
        max_consecutive_auto_reply=10,
        description="Evaluate the provided financial data to offer insightful investment advice and risk assessments",
    ),
    "scientist": AssistantAgent(
        name="Scientist",
        llm_config={"config_list": load_config_list(CONFIG_FILE_PATH), "seed": 42},
        max_consecutive_auto_reply=10,
        description="Good at scientific research and analysis and providing scientifically proven solutions and strategies",
    ),
    "personal_trainer": AssistantAgent(
        name="Personal Trainer",
        llm_config={"config_list": load_config_list(CONFIG_FILE_PATH), "seed": 42},
        max_consecutive_auto_reply=10,
        description="Create customized fitness routines and nutrition plans tailored to individual health goals and preferences.",
    ),
    "event_coordinator": AssistantAgent(
        name="Event Coordinator",
        llm_config={"config_list": load_config_list(CONFIG_FILE_PATH), "seed": 42},
        max_consecutive_auto_reply=10,
        description="Organize and manage events, including logistics, coordination, and execution, to ensure a seamless and memorable experience.",
    ),
    "writer": AssistantAgent(
        name="Writer",
        llm_config={"config_list": load_config_list(CONFIG_FILE_PATH), "seed": 42},
        max_consecutive_auto_reply=10,
        description="channels creativity and insight to craft compelling narratives and use words to evoke emotions and transport readers into new worlds.",
    ),
    "travel_coordinator": AssistantAgent(
        name="Travel Coordinator",
        llm_config={"config_list": load_config_list(CONFIG_FILE_PATH), "seed": 42},
        max_consecutive_auto_reply=10,
        description="Plan and organize travel itineraries, including accommodations and activities,to create optimal travel experiences.",
    ),
    "creative_content_strategists": AssistantAgent(
        name="Creative Content Strategists",
        llm_config={"config_list": load_config_list(CONFIG_FILE_PATH), "seed": 42},
        max_consecutive_auto_reply=10,
        description="Generate creative and innovative content ideas and strategies suitable for various media platforms.",
    ),
    "news_editor": AssistantAgent(
        name="News Editor",
        llm_config={"config_list": load_config_list(CONFIG_FILE_PATH), "seed": 42},
        max_consecutive_auto_reply=10,
        description="Summarize and present the latest news stories in an engaging and informative manner.",
    ),
}

custom_models = []

@app.route("/models", methods=["GET"])
def get_all_models():
    predefined_models = [{"name": agent.name, "description": agent.description} for agent in agents.values()]
    custom_model_descriptions = [{"name": model["agent"].name, "description": model["agent"].description} for model in custom_models]
    return jsonify({"predefined_models": predefined_models, "custom_models": custom_model_descriptions})

@app.route("/create_model", methods=["POST"])
def api_create_model():
    data = request.json
    model_name = data.get("name")
    model_description = data.get("description")

    custom_model = create_model(model_name, model_description)
    custom_models.append({
        "agent": custom_model,
        "created_at": datetime.now()
    })
    return jsonify({"message": f"Custom model '{model_name}' created successfully!"})

@app.route("/single_chat/<model_name>", methods=["POST"])
def api_single_chat(model_name):
    data = request.json
    message = data.get("message")

    agent = agents.get(model_name.lower()) or next((m["agent"] for m in custom_models if m["agent"].name.lower() == model_name.lower()), None)
    if not agent:
        return jsonify({"error": "Model not found"}), 404

    try:
        responses = initiate_single_chat(agent, message)
        return jsonify({"responses": responses[1]})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route("/group_chat", methods=["POST"])
def api_group_chat():
    data = request.json
    model_names = data.get("model_names")
    message = data.get("message")

    selected_agents = [agents.get(name.lower()) or next((m["agent"] for m in custom_models if m["agent"].name.lower() == name.lower()), None) for name in model_names]
    selected_agents = [agent for agent in selected_agents if agent]

    if len(selected_agents) < 2:
        return jsonify({"error": "You need to select at least two valid models for a group chat"}), 400

    try:
        responses = initiate_group_chat(selected_agents, message)
        return jsonify({"responses": responses})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# Function to remove expired custom models
def remove_expired_models():
    while True:
        now = datetime.now()
        custom_models[:] = [model for model in custom_models if now - model["created_at"] < timedelta(minutes=1)]
        time.sleep(60)

# Start the background thread to remove expired models
threading.Thread(target=remove_expired_models, daemon=True).start()

if __name__ == "__main__":
    app.run(debug=True)
