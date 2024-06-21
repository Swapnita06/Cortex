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
        name=name,
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
    "coder": AssistantAgent(
        name="Coder",
        llm_config={"config_list": load_config_list(CONFIG_FILE_PATH), "seed": 42},
        max_consecutive_auto_reply=10,
        description="I am good at writing code",
    ),
    "product_manager": AssistantAgent(
        name="Product_manager",
        system_message="Creative in software product ideas.",
        llm_config={"config_list": load_config_list(CONFIG_FILE_PATH), "seed": 42},
        max_consecutive_auto_reply=10,
        description="I am good at designing products and software.",
    ),
    "scientist": AssistantAgent(
        name="Scientist",
        llm_config={"config_list": load_config_list(CONFIG_FILE_PATH), "seed": 42},
        max_consecutive_auto_reply=10,
        description="I am good at scientific research and analysis.",
    ),
    "doctor": AssistantAgent(
        name="Doctor",
        llm_config={"config_list": load_config_list(CONFIG_FILE_PATH), "seed": 42},
        max_consecutive_auto_reply=10,
        description="I am good at providing medical advice and diagnosis.",
    ),
    "sportsman": AssistantAgent(
        name="Sportsman",
        llm_config={"config_list": load_config_list(CONFIG_FILE_PATH), "seed": 42},
        max_consecutive_auto_reply=10,
        description="I am good at sports and physical fitness.",
    ),
    "artist": AssistantAgent(
        name="Artist",
        llm_config={"config_list": load_config_list(CONFIG_FILE_PATH), "seed": 42},
        max_consecutive_auto_reply=10,
        description="I am good at creating art and design.",
    ),
    "actor": AssistantAgent(
        name="Actor",
        llm_config={"config_list": load_config_list(CONFIG_FILE_PATH), "seed": 42},
        max_consecutive_auto_reply=10,
        description="I am good at providing medical advice and diagnosis.",
    ),
    "police": AssistantAgent(
        name="Police",
        llm_config={"config_list": load_config_list(CONFIG_FILE_PATH), "seed": 42},
        max_consecutive_auto_reply=10,
        description="I am good at providing medical advice and diagnosis.",
    ),
    "nurse": AssistantAgent(
        name="Nurse",
        llm_config={"config_list": load_config_list(CONFIG_FILE_PATH), "seed": 42},
        max_consecutive_auto_reply=10,
        description="I am good at providing medical advice and diagnosis.",
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

    agent = agents.get(model_name) or next((m["agent"] for m in custom_models if m["agent"].name == model_name), None)
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

    selected_agents = [agents.get(name) or next((m["agent"] for m in custom_models if m["agent"].name == name), None) for name in model_names]
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
