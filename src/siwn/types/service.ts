import type { ActorMethod } from '@dfinity/agent'
import type { Principal } from '@dfinity/principal'

export type Address = string

export type CanisterPublicKey = PublicKey

export interface Delegation {
  pubkey: PublicKey
  targets: [] | [Array<Principal>]
  expiration: Timestamp
}

export type GetDelegationResponse = { Ok: SignedDelegation } | { Err: string }

export interface LoginDetails {
  user_canister_pubkey: CanisterPublicKey
  expiration: Timestamp
}

export type LoginResponse = { Ok: LoginDetails } | { Err: string }

export interface PrepareLoginDetails {
  callback_url: string
  message: string
  nonce: string
}

export type PrepareLoginResponse = { Ok: PrepareLoginDetails } | { Err: string }

export type PublicKey = Uint8Array | number[]

export type SessionKey = PublicKey

export interface SignedDelegation {
  signature: Uint8Array | number[]
  delegation: Delegation
}

export type SiwnMessage = string

export type SiwnSignature = string

export type Timestamp = bigint

export type Nonce = string

export interface SIWN_IDENTITY_SERVICE {
  siwn_prepare_login: ActorMethod<[Address], PrepareLoginResponse>
  siwn_login: ActorMethod<[SiwnSignature, Address, string, SessionKey, Nonce], LoginResponse>
  siwn_get_delegation: ActorMethod<[Address, SessionKey, Timestamp], GetDelegationResponse>
}
