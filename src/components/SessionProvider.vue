<template>
  <slot></slot>
</template>

<script setup lang="ts">
import { onBeforeMount, provide, ref } from 'vue'
import { ISessionInfo } from '@inrupt/solid-client-authn-browser';
import { useSessionStore } from '../stores/session'
import * as KEY from '../keys/keys'

const sessionStore = useSessionStore()

const info = ref(undefined as ISessionInfo | undefined)

onBeforeMount(async () => {
  const info0 = await sessionStore.handleRedirectAfterLogin()
  info.value = info0
})

async function logout() {
  await sessionStore.logout()
  info.value = undefined;
}

provide(KEY.SESSION, sessionStore.session)
provide(KEY.SESSION_INFO, info)
provide(KEY.LOGIN, sessionStore.login)
provide(KEY.LOGOUT, logout)
</script>
