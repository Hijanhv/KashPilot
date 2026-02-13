export interface AgentConfig {
  mode: 'autopilot' | 'earn' | 'save' | 'protect'
  minBalance: string
  maxTransactionAmount: string
  confidenceThreshold: number
}

export const DEFAULT_CONFIG: AgentConfig = {
  mode: 'autopilot',
  minBalance: '0.1',
  maxTransactionAmount: '0.01',
  confidenceThreshold: 70,
}

export const MODE_DESCRIPTIONS = {
  autopilot: 'Balanced strategy for optimal growth and safety',
  earn: 'Maximize on-chain activity and reputation building',
  save: 'Focus on accumulating and preserving funds',
  protect: 'Conservative approach with minimal transactions',
}

export const CELO_EXPLORER = {
  alfajores: 'https://alfajores.celoscan.io',
  mainnet: 'https://celoscan.io',
}

export const NETWORK = 'alfajores'
