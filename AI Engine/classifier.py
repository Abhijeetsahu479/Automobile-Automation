import os
import re
from typing import Literal

from dotenv import load_dotenv
from pydantic import BaseModel, Field

load_dotenv()

Label = Literal["stop", "booking", "feedback", "off_topic"]

# Rule: AI ki zaroorat nahi, seedha pakad lo
STOP_PATTERN = re.compile(
    r"\b(stop|unsubscribe|opt[\s-]?out|do not contact|don'?t contact)\b",
    re.IGNORECASE,
)


class Classification(BaseModel):
    label: Label = Field(
        description=(
            "stop = customer wants no more emails; "
            "booking = wants to book or schedule a visit/appointment; "
            "feedback = shares an opinion about the past service; "
            "off_topic = anything unrelated"
        )
    )
    reason: str = Field(description="One short sentence explaining the label")


def is_stop(text: str) -> bool:
    return bool(STOP_PATTERN.search(text))


def classify_with_llm(text: str, service: str = "") -> Classification:
    if not os.getenv("OPENAI_API_KEY"):
        raise RuntimeError("OPENAI_API_KEY nahi mili. .env file check karo.")

    from langchain_openai import ChatOpenAI

    llm = ChatOpenAI(model="gpt-5-nano").with_structured_output(Classification)
    prompt = (
        "You classify a customer's email reply to an auto garage "
        f"(customer's last service: {service or 'unknown'}). "
        "Pick exactly one label.\n\n"
        f"Customer reply:\n{text}"
    )
    return llm.invoke(prompt)


def classify_reply(text: str, service: str = "") -> dict:
    text = (text or "").strip()
    if not text:
        return {"label": "off_topic", "reason": "Empty reply"}
    if is_stop(text):
        return {"label": "stop", "reason": "Matched STOP rule"}
    result = classify_with_llm(text, service)
    return {"label": result.label, "reason": result.reason}


if __name__ == "__main__":
    print(classify_reply("STOP"))
    print(classify_reply("Please unsubscribe me"))
    print(classify_reply(""))