import { ethers } from 'ethers'
import { getWallet, getProvider } from './celo'

// Simplified ABI for x402 Payment Protocol
const X402_PAYMENT_ABI = [
  'function createPayment(address to, string memory metadata) external payable returns (bytes32)',
  'function getPayment(bytes32 paymentId) external view returns (tuple(address from, address to, uint256 amount, string metadata, uint256 timestamp, bool completed))',
  'function getStats(address account) external view returns (uint256 sent, uint256 received)',
  'event PaymentCreated(bytes32 indexed paymentId, address from, address to, uint256 amount)',
]

// Deploy address (you'll need to deploy the contract first)
const X402_PAYMENT_ADDRESS = process.env.NEXT_PUBLIC_X402_PAYMENT_CONTRACT || '0x0000000000000000000000000000000000000000'

export async function createX402Payment(
  privateKey: string,
  to: string,
  amount: string,
  metadata: string
) {
  const wallet = getWallet(privateKey)
  const contract = new ethers.Contract(X402_PAYMENT_ADDRESS, X402_PAYMENT_ABI, wallet)
  
  try {
    const tx = await contract.createPayment(to, metadata, {
      value: ethers.parseEther(amount),
    })
    const receipt = await tx.wait()
    
    // Extract paymentId from event logs
    const event = receipt.logs.find((log: any) => {
      try {
        return contract.interface.parseLog(log)?.name === 'PaymentCreated'
      } catch {
        return false
      }
    })
    
    return { 
      success: true, 
      txHash: tx.hash,
      paymentId: event ? contract.interface.parseLog(event)?.args[0] : null
    }
  } catch (error: any) {
    return { success: false, error: error.message }
  }
}

export async function getPaymentStats(address: string) {
  const provider = getProvider()
  const contract = new ethers.Contract(X402_PAYMENT_ADDRESS, X402_PAYMENT_ABI, provider)
  
  try {
    const stats = await contract.getStats(address)
    return {
      totalSent: ethers.formatEther(stats[0]),
      totalReceived: ethers.formatEther(stats[1]),
    }
  } catch (error: any) {
    return { totalSent: '0', totalReceived: '0' }
  }
}
