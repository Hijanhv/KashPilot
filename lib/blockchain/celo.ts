import { ethers } from 'ethers'

const CELO_ALFAJORES_RPC = process.env.NEXT_PUBLIC_CELO_RPC_URL || 'https://alfajores-forno.celo-testnet.org'

export function getProvider() {
  return new ethers.JsonRpcProvider(CELO_ALFAJORES_RPC)
}

export function getWallet(privateKey: string) {
  const provider = getProvider()
  return new ethers.Wallet(privateKey, provider)
}

export async function getBalance(address: string): Promise<string> {
  const provider = getProvider()
  const balance = await provider.getBalance(address)
  return ethers.formatEther(balance)
}

export async function sendTransaction(
  privateKey: string,
  to: string,
  amount: string
): Promise<string> {
  const wallet = getWallet(privateKey)
  
  const tx = await wallet.sendTransaction({
    to,
    value: ethers.parseEther(amount),
  })
  
  await tx.wait()
  return tx.hash
}

export function generateWallet() {
  const wallet = ethers.Wallet.createRandom()
  return {
    address: wallet.address,
    privateKey: wallet.privateKey,
    mnemonic: wallet.mnemonic?.phrase || '',
  }
}
