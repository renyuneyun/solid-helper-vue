import { ISessionInfo, Session } from '@inrupt/solid-client-authn-browser'
import { Ref, type InjectionKey } from 'vue'
import { PublicInterface } from '../helper'

/**
 * Key for the Session object. Reactivity is effectively lost (probably due to the fact that Session manages its state external to Vue's reactivity mechanism)
 */
export const SESSION = Symbol() as InjectionKey<PublicInterface<Session>>
/**
 * Key for the ISessionInfo object. It's a `ref()` variable with reactivity
 */
export const SESSION_INFO = Symbol() as InjectionKey<Ref<ISessionInfo | undefined>>
/**
 * Function for performing log-in
 */
export const LOGIN = Symbol() as InjectionKey<(solidIdentityProvider: string, redirectUrl: string, clientName: string) => Promise<void>>
/**
 * Function for performing log-out
 */
export const LOGOUT = Symbol() as InjectionKey<() => Promise<void>>
