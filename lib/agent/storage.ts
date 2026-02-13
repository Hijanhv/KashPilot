import fs from 'fs'
import path from 'path'

const DATA_DIR = path.join(process.cwd(), 'data')
const TRANSACTIONS_FILE = path.join(DATA_DIR, 'transactions.json')
const AGENT_LOGS_FILE = path.join(DATA_DIR, 'agent-logs.json')

export interface Transaction {
  address: string
  action: string
  amount: string
  recipient: string
  timestamp: number
  reason: string
  txHash: string
}

export interface AgentLog {
  timestamp: number
  message: string
  type: 'info' | 'decision' | 'action' | 'error'
}

// Ensure data directory exists
function ensureDataDir() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true })
  }
}

// Transactions
export async function saveTransaction(transaction: Transaction) {
  ensureDataDir()
  
  let transactions: Transaction[] = []
  
  if (fs.existsSync(TRANSACTIONS_FILE)) {
    const data = fs.readFileSync(TRANSACTIONS_FILE, 'utf-8')
    transactions = JSON.parse(data)
  }
  
  transactions.push(transaction)
  
  // Keep only last 1000 transactions
  if (transactions.length > 1000) {
    transactions = transactions.slice(-1000)
  }
  
  fs.writeFileSync(TRANSACTIONS_FILE, JSON.stringify(transactions, null, 2))
}

export async function getRecentTransactions(address: string, limit = 10): Promise<Transaction[]> {
  ensureDataDir()
  
  if (!fs.existsSync(TRANSACTIONS_FILE)) {
    return []
  }
  
  const data = fs.readFileSync(TRANSACTIONS_FILE, 'utf-8')
  const transactions: Transaction[] = JSON.parse(data)
  
  return transactions
    .filter(tx => tx.address === address)
    .sort((a, b) => b.timestamp - a.timestamp)
    .slice(0, limit)
}

export async function getAllTransactions(address: string): Promise<Transaction[]> {
  ensureDataDir()
  
  if (!fs.existsSync(TRANSACTIONS_FILE)) {
    return []
  }
  
  const data = fs.readFileSync(TRANSACTIONS_FILE, 'utf-8')
  const transactions: Transaction[] = JSON.parse(data)
  
  return transactions
    .filter(tx => tx.address === address)
    .sort((a, b) => b.timestamp - a.timestamp)
}

// Agent Logs
export async function saveAgentLog(log: AgentLog) {
  ensureDataDir()
  
  let logs: AgentLog[] = []
  
  if (fs.existsSync(AGENT_LOGS_FILE)) {
    const data = fs.readFileSync(AGENT_LOGS_FILE, 'utf-8')
    logs = JSON.parse(data)
  }
  
  logs.push(log)
  
  // Keep only last 500 logs
  if (logs.length > 500) {
    logs = logs.slice(-500)
  }
  
  fs.writeFileSync(AGENT_LOGS_FILE, JSON.stringify(logs, null, 2))
}

export async function getRecentLogs(limit = 20): Promise<AgentLog[]> {
  ensureDataDir()
  
  if (!fs.existsSync(AGENT_LOGS_FILE)) {
    return []
  }
  
  const data = fs.readFileSync(AGENT_LOGS_FILE, 'utf-8')
  const logs: AgentLog[] = JSON.parse(data)
  
  return logs
    .sort((a, b) => b.timestamp - a.timestamp)
    .slice(0, limit)
}
