# AI Media Agent - Execution Instructions

## 1. Prerequisites

- **Docker** and **Docker Compose** installed on your system.
- An API Key for either **Google Gemini** or **OpenAI**.

## 2. Configuration

1. In the root of the project (`ai-media-agent/`), copy the environment template:
   ```bash
   cp .env.example .env
   ```
2. Open `.env` and configure your API keys:
   - Sets `GEMINI_API_KEY=your_key` if using Gemini (default).
   - Set `OPENAI_API_KEY=your_key` if using OpenAI, and change `LLM_PROVIDER=openai`.

## 3. Running the Application (Production-Ready Containers)

To spin up the entire application (Frontend + Backend), simply run:

```bash
docker-compose up --build
```

### Accessing the App

- **Frontend UI:** Open your browser and navigate to `http://localhost:5173`. You will see the futuristic agent dashboard.
- **Backend API Docs:** Navigate to `http://localhost:8001/docs` to see the automatically generated interactive API documentation (Swagger UI).
- **Agent Logs:** The agent's thought process, complete prompts, and structured parsing outputs are logged locally to the file `backend/agent_execution.log.md`. You can actively `tail -f` this or view it in a Markdown viewer.

## 4. Architecture and Choices

- **Python FastAPI Backend:** Chosen for extreme performance, type safety (via Pydantic), and rapid async execution of LLM API calls.
- **Agentic Engine:** Uses the newest native SDKs (`google-genai` and `openai`) enforcing `json_object` output structuring to ensure the agent's decisions cleanly map back into application state without parsing errors.
- **React + Vite Frontend:** A blazing-fast setup utilizing Tailwind CSS for styling and Framer Motion for futuristic, staggered animations, glowing neon accents, and glassmorphism.

## 5. Testing

Unit tests have been provided for validating the Pydantic schemas and backend endpoint structures. You can run them manually within the backend container or locally if Python is installed:

```bash
cd backend
pip install -r requirements.txt pytest httpx
pytest tests/
```
