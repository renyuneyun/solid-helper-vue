# Solid Helper for Vue (3)

This repo aims to provide helpers for developing [SoLiD (Social Linked Data)](https://solidproject.org/) Apps with Vuejs (3).

It emerged from my personal requirements, because the official Solid libraries are not natual for Vue.

# Usage example

## Pinia store

Set up Pinia as you always does. Then you can use the store as if it's in your application (or defined a helper in your custom store):

```
import { useSessionStore } from 'solid-helper-vue';

const sessionStore = useSessionStore();

sessionStore.login(idp, explorerStore.loginRedirectUrl);

...

# Then in somewhere else

sessionStore.handleRedirectAfterLogin()
```

## Provider

Use `SessionProvider` as a provider, and put your components inside it; then inject the relevant variables.

E.g. in your application, specify this as a component:

```
<template>
  <session-provider>
    <router-view />
  </session-provider>
</template>

<script setup lang="ts">
import { SessionProvider } from 'solid-helper-vue'
</script>
```

Then in a sub-component loaded by router (or directly use your own component), you can use the following:

```
<script setup lang="ts">
import { inject } from 'vue';
import { KEYS } from 'solid-helper-vue';

const session = inject(KEYS.SESSION);  // The `Session` object, from `@inrupt/solid-client-authn-browser`. Note that reactivity is lost.
const sessionInfo = inject(KEYS.SESSION_INFO)  // The `ISessionInfo` object with equivalent value as `session.info`.
const login = inject(KEYS.LOGIN);  // A function to log-in, same as that in session store (of this library).
const logout = inject(KEYS.LOGOUT);  // A function to log-out, same as that in session store (of this library).
</script>
```


# Current features

- Session management through Pinia store: `useSessionStore`
   - As a Pinia store, providing:
      - `login(solidIdentityProvider: string, redirectUrl: string, clientName: string)`
      - `logout()`
      - `handleRedirectAfterLogin(redirectUrl?: string, restorePreviousSession?: boolea)`
   - It handles the hooks automatically, using first-layer custom variables to keep reactivity.
      - Directly using properties in `Session` object will lose reactivity, for unknown reason.
- Session management through provider component: `SessionProvider`
   - As a Vue component, without UI; similar to React Context. See example above.
   - It handles redirect automatically, so remember to insert it early enough.
