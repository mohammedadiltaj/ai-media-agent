import os
import json
from datetime import datetime
from google import genai
from agent.models import AgentRequest, AgentDecision

# Setting up flat file logging for visibility
LOG_FILE = "/app/agent_execution.log.md"

def log_interaction(prompt: str, raw_response: str, decision: dict = None, error: str = None):
    try:
        with open(LOG_FILE, "a") as f:
            f.write(f"\n## Execution at {datetime.now().isoformat()}\n")
            f.write(f"### Prompt Submitted:\n```text\n{prompt}\n```\n")
            if raw_response:
                f.write(f"### Raw LLM Output:\n```json\n{raw_response}\n```\n")
            if decision:
                f.write(f"### Parsed Decision:\n```json\n{json.dumps(decision, indent=2)}\n```\n")
            if error:
                f.write(f"### Error Encountered:\n```text\n{error}\n```\n")
            f.write("\n---\n")
    except Exception as e:
        print(f"Failed to log: {e}")

class MediaAgent:
    def __init__(self):
        self.provider = os.getenv("LLM_PROVIDER", "gemini").lower()

        if self.provider == "gemini":
            api_key = os.getenv("GEMINI_API_KEY")
            if not api_key:
                raise ValueError("GEMINI_API_KEY environment variable is required")
            self.client = genai.Client(api_key=api_key)
            self.model_name = "gemini-2.5-flash"
        elif self.provider == "openai":
            import openai
            api_key = os.getenv("OPENAI_API_KEY")
            if not api_key:
                raise ValueError("OPENAI_API_KEY environment variable is required")
            self.client = openai.OpenAI(api_key=api_key)
            self.model_name = "gpt-4-turbo"
        else:
            raise ValueError(f"Unsupported provider: {self.provider}")

    def generate_prompt(self, request: AgentRequest) -> str:
        c = request.content
        prompt = f"""
You are an expert, autonomous AI agent working for a top-tier media company.
Your mission is to maximize the lifetime value (LTV) of every title by crafting optimal release strategies.

You have been given the following content metadata for a title:

- Title ID: {c.title_id}
- Genre: {c.genre}
- Duration: {c.duration_minutes} minutes
- Description: {c.description}

Based solely on this content metadata, you must autonomously determine the optimal:
1. Release schedule (timing, cadence, exclusivity windows)
2. Windowing strategy (platform sequencing, holdback periods)
3. Promotional spend allocation (across channels: Social, TV, Digital, PR, Influencer, etc.)
4. Platform placement (which streaming/distribution platforms to target and in what order)

Critical requirements:
- Your "reasoning" field MUST be a detailed, specific explanation of WHY you made each strategic choice, directly referencing the genre, duration, and description provided. This should read like a senior strategist explaining their thinking.
- Base all decisions on the genre conventions, likely audience, and content characteristics implied by the description and duration.
- Be specific and actionable in your recommendations.

Respond ONLY with a valid JSON object matching this exact schema. No markdown, no extra text.

{{
  "title_id": "string",
  "recommended_release_schedule": "string (detailed, specific timing strategy)",
  "windowing_strategy": "string (detailed platform sequencing strategy)",
  "promotional_spend_allocation": {{"Social Media": 0.0, "Digital Ads": 0.0, "TV/OOH": 0.0, "PR & Press": 0.0, "Influencer": 0.0}},
  "platform_placement": ["string"],
  "reasoning": "string (detailed explanation referencing the specific genre, duration, and content description — explain WHY each decision was made)",
  "estimated_lifetime_value_uplift": 0.0
}}
"""
        return prompt.strip()

    def run(self, request: AgentRequest) -> AgentDecision:
        prompt = self.generate_prompt(request)
        raw_output = ""

        try:
            if self.provider == "gemini":
                from google.genai import types
                response = self.client.models.generate_content(
                    model=self.model_name,
                    contents=prompt,
                    config=types.GenerateContentConfig(temperature=0.0)
                )
                raw_output = response.text
            elif self.provider == "openai":
                response = self.client.chat.completions.create(
                    model=self.model_name,
                    messages=[{"role": "user", "content": prompt}],
                    response_format={"type": "json_object"},
                    temperature=0.0
                )
                raw_output = response.choices[0].message.content

            # Clean up the output in case the LLM wrapped it in markdown
            clean_output = raw_output.replace('```json', '').replace('```', '').strip()
            decision_dict = json.loads(clean_output)
            decision = AgentDecision(**decision_dict)

            log_interaction(prompt, raw_output, decision=decision.model_dump())
            return decision

        except Exception as e:
            log_interaction(prompt, raw_output, error=str(e))
            raise Exception(f"Agent failed to generate or parse response: {str(e)}")
