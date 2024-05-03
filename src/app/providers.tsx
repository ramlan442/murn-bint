'use client'

'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { createWeb3Modal } from '@web3modal/wagmi/react'
import { type State, WagmiProvider as Wagmi } from 'wagmi'
import { config, projectId } from '../config/wagmi'
import { type PropsWithChildren } from 'react'

const queryClient = new QueryClient()

if (!projectId) {
  throw new Error('Project ID is not defined')
}

createWeb3Modal({
  wagmiConfig: config,
  projectId,
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