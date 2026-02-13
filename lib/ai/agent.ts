import OpenAI from 'openai'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export interface AgentDecision {
  action: 'save' | 'send' | 'earn' | 'wait' | 'protect'
  reason: string
  amount?: string
  recipient?: string
  confidence: number
}

export interface AgentContext {
  balance: string
  recentActivity: string[]
  mode: 'autopilot' | 'earn' | 'save' | 'protect'
  reputation: number
}

export async function getAgentDecision(context: AgentContext): Promise<AgentDecision> {
  const prompt = `You are KashPilot, an autonomous economic AI agent managing a crypto wallet on Celo blockchain.

Current Context:
- Wallet Balance: ${context.balance} CELO
- Mode: ${context.mode}
- Reputation Score: ${context.reputation}
- Recent Activity: ${context.recentActivity.join(', ') || 'No recent activity'}

Based on the current context, decide what action to take. Consider:
1. In EARN mode: Focus on micro-payments and recurring transfers to build activity
2. In SAVE mode: Prioritize saving funds, minimize outgoing transactions
3. In PROTECT mode: Be very conservative, only essential transactions
4. In AUTOPILOT mode: Balance all strategies intelligently

Respond with a JSON object containing:
{
  "action": "save" | "send" | "earn" | "wait" | "protect",
  "reason": "Brief explanation of your decision",
  "amount": "Amount in CELO (if applicable)",
  "recipient": "Recipient address (if applicable)",
  "confidence": 0-100 confidence score
}

Make a decision now:`

  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [
        {
          role: 'system',
          content: 'You are KashPilot, an intelligent economic agent. Always respond with valid JSON only.',
        },
        {
          role: 'user',
          content: prompt,
        },
      ],
      temperature: 0.7,
      max_tokens: 300,
    })

    const content = response.choices[0].message.content || '{}'
    const decision: AgentDecision = JSON.parse(content)
    
    return decision
  } catch (error) {
    console.error('Agent decision error:', error)
    // Fallback decision
    return {
      action: 'wait',
      reason: 'Analyzing market conditions',
      confidence: 50,
    }
  }
}

export async function getAgentThinking(context: string): Promise<string> {
  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [
        {
          role: 'system',
          content: 'You are KashPilot AI. Provide brief, intelligent commentary about wallet activity. Be concise and insightful.',
        },
        {
          role: 'user',
          content: context,
        },
      ],
      temperature: 0.8,
      max_tokens: 100,
    })

    return response.choices[0].message.content || 'Analyzing...'
  } catch (error) {
    return 'Processing wallet data...'
  }
}
