'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { createWeb3Modal } from '@web3modal/wagmi/react'
import { type State, WagmiProvider as Wagmi } from 'wagmi'
import { config, projectId, WOJAX_CONTRACT_ADDRESS_ERC20HX } from '../config/wagmi'
import { type PropsWithChildren } from 'react'

const queryClient = new QueryClient()

if (!projectId) {
  throw new Error('Project ID is not defined')
}

createWeb3Modal({
  wagmiConfig: config,
  projectId,
  tokens: {
    8453: {
      address: WOJAX_CONTRACT_ADDRESS_ERC20HX,
    }
  },
  chainImages: {
    8453: 'https://wojax.xyz/assets/albert.png'
  }
})

interface ProviderProps extends PropsWithChildren {
  initialState: State | undefined
}

export function WagmiProvider({ initialState, children } : ProviderProps) {
  return (
    <Wagmi config={config} initialState={initialState}>
        <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </Wagmi>
  )
}