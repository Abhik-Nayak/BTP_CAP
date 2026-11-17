// Run: node test/chat-agent.js "Order 2 copies of Catweazle"
import readline from 'node:readline/promises'

const AGENT_URL = 'http://localhost:4004/a2a/order'

// Send one message to the agent and return the task
async function send(text, taskId, contextId) {
  const message = {
    kind: 'message',
    role: 'user',
    messageId: crypto.randomUUID(),
    parts: [{ kind: 'text', text: text }]
  }

  // Only when continuing a paused task
  if (taskId) message.taskId = taskId
  if (contextId) message.contextId = contextId

  const res = await fetch(AGENT_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ jsonrpc: '2.0', id: 1, method: 'message/send', params: { message } })
  })
  const data = await res.json()
  return data.result
}

// 1. Ask the question
const question = process.argv[2] || 'Order 2 copies of Catweazle'
let task = await send(question)

console.log('State :', task.status.state)
console.log('Answer:', task.status.message.parts[0].text)

// 2. If the agent is waiting for approval, ask the human
if (task.status.state === 'input-required') {
  const rl = readline.createInterface({ input: process.stdin, output: process.stdout })
  const decision = await rl.question('\nType approve or reject: ')
  rl.close()

  // 3. Resume the same task with the decision
  task = await send(decision, task.id, task.contextId)

  console.log('\nState :', task.status.state)
  console.log('Answer:', task.status.message.parts[0].text)
}
