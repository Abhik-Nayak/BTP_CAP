# Getting Started

Welcome to your new CAP project.

It contains these folders and files, following our recommended project layout:

File or Folder | Purpose
---------|----------
`app/` | content for UI frontends goes here
`db/` | your domain models and data go here
`srv/` | your service models and code go here
`readme.md` | this getting started guide

## Next Steps

- Open a new terminal and run `cds watch`
- (in VS Code simply choose _**Terminal** > Run Task > cds watch_)
- Start with your domain model, in a CDS file in `db/`

## cap-agent – CAP AI Agent with Local LLM

Turns a CAP service into an AI agent using `@cap-js/agents`, served over the A2A protocol, running fully local with Ollama (Docker).

### What was achieved
- **CAP service → AI agent** with a single `@agent` annotation (served at `/odata/v4/catalog` and `/a2a/catalog`)
- **Agent Card** auto-generated from the CDS model (`/a2a/catalog/.well-known/agent-card.json`)
- **Mock LLM** for offline testing (`cds watch --profile mock`)
- **Local LLM via Ollama** (OpenAI-compatible API, `qwen3` models) configured in `package.json` → `cds.requires.llm`
- **Agent instructions** via CDS doc comment (`/** ... */`), injected into the system prompt
- **Read tools**: agent uses `describe` + `query` tools → CAP turns them into SQL
- **Action tool**: `orderBook` action (CDS + JS handler) callable by the agent
- **Human-in-the-loop**: `@agent.hitl` pauses the agent for approve/reject before ordering
- **A2A clients**: Node scripts calling the agent directly (`test/ask-agent.js`, `test/chat-agent.js` with approve/reject)

### How it works
User → A2A (`/a2a/catalog`) → Agent (@cap-js/agents) → LLM (Ollama) → tool call → CAP → SQLite → LLM → answer

### Run


### Key learnings
- The LLM never touches the DB. It only writes tool calls, and CAP executes them.
- Changing the LLM only means changing config (`cds.requires.llm`). The code stays the same.
- Small local models: thinking models (`qwen3:8b`) are reliable but slow, while instruct models are fast but sometimes skip tool calls.
- The model must fit fully in GPU VRAM for good speed (`ollama ps` → `100% GPU`).
- Business code + HITL are the safety layer, not the LLM.

## Learn More

Learn more at <https://cap.cloud.sap>.
