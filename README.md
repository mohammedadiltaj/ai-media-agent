# 🎬 AI Media Strategy Agent

![Docker Desktop](https://img.shields.io/badge/Docker-Ready-2496ED?logo=docker)
![FastAPI](https://img.shields.io/badge/FastAPI-Backend-009688?logo=fastapi)
![React](https://img.shields.io/badge/React-Frontend-61DAFB?logo=react)
![Vite](https://img.shields.io/badge/Vite-Bundler-646CFF?logo=vite)
![LLM Supported](https://img.shields.io/badge/Generative_AI-Gemini%20%7C%20OpenAI-FF1493)

Welcome to the **AI Media Agent** — a production-ready, autonomous AI-powered tool engineered for modern media companies. This application intelligently analyzes content metadata (such as Genre, Duration, and Description) to generate expert-level release strategies, promotional spend allocation, and platform windowing recommendations to maximize the Lifetime Value (LTV) of any piece of content.

---

## 🚀 Features

- **Autonomous Strategy Generation:** Drop in content metadata and watch the agent formulate a tactical release schedule.
- **Provider Agnostic:** Out-of-the-box support for both **Google Gemini** (default) and **OpenAI**.
- **Intuitive UI:** A futuristic, blazing-fast React frontend built with Vite, Tailwind CSS, and Framer Motion for a sleek glassmorphism aesthetic.
- **Robust Architecture:** Powered by a high-performance Python FastAPI backend utilizing Pydantic for rigid type-safety and structured LLM outputs.
- **Fully Containerized:** Local development and production deployment are simplified via Docker Compose.

---

## 🛠️ Tech Stack

### Frontend
- **Framework:** React + Vite
- **Styling:** Tailwind CSS + Framer Motion
- **Architecture:** Component-driven, responsive design focusing on rich aesthetics and micro-animations.

### Backend
- **Framework:** Python + FastAPI
- **Validation:** Pydantic
- **AI Integration:** Native `google-genai` and `openai` SDKs enforcing structured `json_object` outputs.

---

## ⚙️ Getting Started

### 1. Prerequisites All You Need
Make sure you have the following installed to run the stack seamlessly:
- **[Docker](https://www.docker.com/)** and **Docker Compose**
- An API Key from [Google AI Studio (Gemini)](https://aistudio.google.com/app/apikey) or [OpenAI](https://platform.openai.com/api-keys).

### 2. Environment Configuration
Clone the repository and set up your environment variables. 

```bash
# Navigate sequentially into the project folder
cd ai-media-agent

# Copy the example environment template
cp .env.example .env
```

Open the newly created `.env` file and paste your preferred API key:
- **For Google Gemini (Default):** Set `GEMINI_API_KEY=your_actual_key_here`
- **For OpenAI:** Set `OPENAI_API_KEY=your_actual_key_here` and update `LLM_PROVIDER=openai`.

---

## 🏃‍♂️ Running the Application

With Docker, running the entire stack (Backend + Frontend) is a single command. 

```bash
docker-compose up --build
```
*Note: Make sure your Docker daemon/Docker Desktop is running before executing this!*

### Port Mapping & Access Points

Once the containers spin up, you can access the different parts of the platform here:

| Service | URL | Description |
| :--- | :--- | :--- |
| **🏎️ Frontend UI** | [http://localhost:5173](http://localhost:5173) | The main interactive dashboard for the Media Agent. |
| **🔌 Backend API Docs** | [http://localhost:8001/docs](http://localhost:8001/docs) | Interactive Swagger UI detailing all backend endpoints. |

---

## 🧠 Under the Hood: Agent Monitoring

Curious about how the AI comes up with its answers? The system logs its entire "thought process." 

Whenever you run an analysis, the exact prompt sent to the LLM, the raw JSON output it returns, and the parsed final decisions are appended to a flat markdown log file.

You can observe the agent's thoughts locally by watching this file:
```bash
tail -f backend/agent_execution.log.md
```

---

## 🧪 Testing

The platform includes comprehensive test coverage for backend Pydantic schemas and endpoint validation. If you want to run the tests locally (outside of Docker), ensure Python is installed, then run the following:

```bash
cd backend
pip install -r requirements.txt pytest httpx
pytest tests/
```

---

*Engineered for the future of media strategy.*
