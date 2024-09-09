import { DelegationChain, DelegationIdentity, Ed25519KeyIdentity } from '@dfinity/identity'

import type { SiwnIdentityStorage } from './types'

const STORAGE_KEY = 'siwnIdentity'

export function loadIdentity() {
  const storedState = localStorage.getItem(STORAGE_KEY)

  if (!storedState) {
    throw new Error('No stored identity found.')
  }

  const s: SiwnIdentityStorage = JSON.parse(storedState)
  if (!s.address || !s.sessionIdentity || !s.delegationChain) {
    throw new Error('Stored state is invalid.')
  }

  const d = DelegationChain.fromJSON(JSON.stringify(s.delegationChain))
  const i = DelegationIdentity.fromDelegation(
    Ed25519KeyIdentity.fromJSON(JSON.stringify(s.sessionIdentity)),
    d,
  )

  return [s.address, i, d] as const
}

export function saveIdentity(
  address: string,
  sessionIdentity: Ed25519KeyIdentity,
  delegationChain: DelegationChain,
) {
  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify({
      address: address,
      sessionIdentity: sessionIdentity.toJSON(),
      delegationChain: delegationChain.toJSON(),
    }),
  )
}

export function clearIdentity() {
  localStorage.removeItem(STORAGE_KEY)
}
