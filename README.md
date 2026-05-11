# ai-support-bot
# AI SupportFlow

> AI-powered customer support assistant with intelligent FAQ retrieval, Gemini-powered responses, automated escalation workflows, and a real-time admin dashboard.

AI SupportFlow is a full-stack AI support automation prototype designed to simulate how modern businesses can streamline customer service operations using AI-assisted workflows and human escalation pipelines.

Built as a practical MVP for rapid deployment and extensibility.
--

# Features

| Feature | Description |
|---|---|
| AI Chat Assistant | WhatsApp-inspired customer support interface with real-time messaging |
| Gemini AI Integration | Context-aware support responses generated using Gemini 2.5 Flash |
| FAQ Retrieval System | Keyword-based knowledge base matching for grounded responses |
| Smart Escalation Workflow | Automatically escalates unresolved or low-confidence conversations |
| Human Support Escalation | Manual “Talk to Human” option for seamless fallback support |
| Admin Dashboard | View, monitor, and resolve escalated support tickets |
| Conversation Context Memory | Multi-turn chat history maintained for better AI continuity |
| Fast Lightweight Architecture | Simple modular backend optimized for rapid prototyping |

---

#  System Architecture

```mermaid
flowchart TD
    A[ Customer] -->|Send Message| B[React Frontend]

    B -->|POST /chat| C[Express Backend]

    C --> D[(FAQ Knowledge Base)]

    D -->|Matched Context| C

    C -->|Prompt + Context + History| E[Gemini 1.5 Flash API]

    E -->|AI Response| C

    C --> F{Escalation Required?}

    F -->|Yes| G[Create Support Ticket]
    F -->|No| H[Return AI Response]

    G --> I[(In-Memory Ticket Store)]

    I -->|GET /tickets| J[ Admin Dashboard]

    J -->|PATCH /tickets/:id| I

    H --> B
