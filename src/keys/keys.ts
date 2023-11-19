import { ISessionInfo, Session } from '@inrupt/solid-client-authn-browser'
import { Ref, type InjectionKey } from 'vue'
import { PublicInterface } from '../helper'

export const SESSION = Symbol() as InjectionKey<PublicInterface<Session>>
export const SESSION_INFO = Symbol() as InjectionKey<Ref<ISessionInfo | undefined>>
export const LOGIN = Symbol() as InjectionKey<(solidIdentityProvider: string, redirectUrl: string, clientName: string) => Promise<void>>
export const LOGOUT = Symbol() as InjectionKey<() => Promise<void>>
