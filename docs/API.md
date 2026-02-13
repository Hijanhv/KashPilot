# KashPilot API Documentation

## Base URL
\`\`\`
http://localhost:3000/api
\`\`\`

## Endpoints

### Dashboard

#### GET /api/dashboard
Get dashboard data including wallet balance, stats, and recent activity.

**Response:**
\`\`\`json
{
  "success": true,
  "wallet": {
    "balance": "1.2345",
    "address": "0x...",
    "isConnected": true
  },
  "stats": {
    "totalTransactions": 42,
    "reputationScore": 150,
    "earnings": "0.0234",
    "agentStatus": "active"
  },
  "recentActivity": [...]
}
\`\`\`

### Wallet

#### POST /api/wallet/connect
Connect agent wallet.

**Response:**
\`\`\`json
{
  "success": true,
  "address": "0x...",
  "balance": "1.2345"
}
\`\`\`

### Agent Control

#### GET /api/agent/status
Get current agent status.

**Response:**
\`\`\`json
{
  "success": true,
  "isActive": true,
  "mode": "autopilot"
}
\`\`\`

#### POST /api/agent/toggle
Start or pause the agent.

**Request Body:**
\`\`\`json
{
  "action": "start" | "pause"
}
\`\`\`

**Response:**
\`\`\`json
{
  "success": true,
  "isActive": true,
  "mode": "autopilot"
}
\`\`\`

#### POST /api/agent/mode
Change agent mode.

**Request Body:**
\`\`\`json
{
  "mode": "autopilot" | "earn" | "save" | "protect"
}
\`\`\`

**Response:**
\`\`\`json
{
  "success": true,
  "mode": "autopilot"
}
\`\`\`

#### GET /api/agent/logs
Get agent thinking logs.

**Response:**
\`\`\`json
{
  "success": true,
  "logs": [
    {
      "timestamp": 1234567890,
      "message": "Analyzing wallet...",
      "type": "info" | "decision" | "action" | "error"
    }
  ]
}
\`\`\`

#### POST /api/agent/command
Execute natural language command.

**Request Body:**
\`\`\`json
{
  "command": "Send 0.01 CELO to savings"
}
\`\`\`

**Response:**
\`\`\`json
{
  "success": true,
  "response": "Command executed successfully"
}
\`\`\`

### Transactions

#### GET /api/transactions
Get transaction history with optional filtering.

**Query Parameters:**
- \`filter\`: "all" | "payments" | "savings" | "agent"

**Response:**
\`\`\`json
{
  "success": true,
  "transactions": [
    {
      "time": "2024-01-01 12:00:00",
      "action": "send",
      "amount": "0.01",
      "wallet": "0x1234...5678",
      "status": "completed",
      "txHash": "0xabcd...",
      "reason": "Micro-payment",
      "type": "send"
    }
  ]
}
\`\`\`

## Error Handling

All endpoints return errors in this format:

\`\`\`json
{
  "success": false,
  "error": "Error message here"
}
\`\`\`

## Rate Limiting

No rate limiting in development. Production should implement appropriate limits.

## Authentication

Currently no authentication required. Add authentication before production deployment.
