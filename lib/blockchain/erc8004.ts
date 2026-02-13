import { ethers } from 'ethers'
import { getWallet, getProvider } from './celo'

// Simplified ABI for ERC-8004 Agent Identity
const AGENT_IDENTITY_ABI = [
  'function registerAgent(string memory agentId) external',
  'function recordTransaction() external',
  'function getAgentInfo(address agentAddress) external view returns (tuple(address agentAddress, string agentId, uint256 reputationScore, uint256 totalTransactions, uint256 registeredAt, bool isActive))',
  'event AgentRegistered(address indexed agentAddress, string agentId, uint256 timestamp)',
  'event ReputationUpdated(address indexed agentAddress, uint256 newScore)',
]

// Deploy address (you'll need to deploy the contract first)
const AGENT_IDENTITY_ADDRESS = process.env.NEXT_PUBLIC_AGENT_IDENTITY_CONTRACT || '0x0000000000000000000000000000000000000000'

export async function registerAgent(privateKey: string, agentId: string) {
  const wallet = getWallet(privateKey)
  const contract = new ethers.Contract(AGENT_IDENTITY_ADDRESS, AGENT_IDENTITY_ABI, wallet)
  
  try {
    const tx = await contract.registerAgent(agentId)
    await tx.wait()
    return { success: true, txHash: tx.hash }
  } catch (error: any) {
    return { success: false, error: error.message }
  }
}

export async function recordAgentTransaction(privateKey: string) {
  const wallet = getWallet(privateKey)
  const contract = new ethers.Contract(AGENT_IDENTITY_ADDRESS, AGENT_IDENTITY_ABI, wallet)
  
  try {
    const tx = await contract.recordTransaction()
    await tx.wait()
    return { success: true, txHash: tx.hash }
  } catch (error: any) {
    return { success: false, error: error.message }
  }
}

export async function getAgentInfo(address: string) {
  const provider = getProvider()
  const contract = new ethers.Contract(AGENT_IDENTITY_ADDRESS, AGENT_IDENTITY_ABI, provider)
  
  try {
    const info = await contract.getAgentInfo(address)
    return {
      agentAddress: info[0],
      agentId: info[1],
      reputationScore: Number(info[2]),
      totalTransactions: Number(info[3]),
      registeredAt: Number(info[4]),
      isActive: info[5],
    }
  } catch (error: any) {
    return null
  }
}
