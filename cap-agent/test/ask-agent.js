// Run: node test/ask-agent.js "Which books did Jane Austen write?"

const question = process.argv[2] || 'Which books did Jane Austen write?'

// 1. Build the A2A message (JSON-RPC format)
const body = {
  jsonrpc: '2.0',
  id: 1,
  method: 'message/send',
  params: {
    message: {
      kind: 'message',
      role: 'user',
      messageId: crypto.randomUUID(),
      parts: [{ kind: 'text', text: question }]
    }
  }
}

// 2. Send it to the agent endpoint
const res = await fetch('http://localhost:4004/a2a/catalog', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(body)
})

// 3. Read the answer
const data = await res.json()
const task = data.result

console.log('State :', task.status.state)
console.log('Answer:', task.status.message.parts[0].text)
