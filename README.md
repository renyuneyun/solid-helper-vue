# Solid Helper for Vue (3)

This repo aims to provide helpers for developing [SoLiD (Social Linked Data)](https://solidproject.org/) Apps with Vuejs (3).

It emerged from my personal requirements, because the official Solid libraries are not natual for Vue.

# Usage example

```
import { useSessionStore } from 'solid-helper-vue';

const sessionStore = useSessionStore();

sessionStore.login(idp, explorerStore.loginRedirectUrl);
```

# Current features

- Session management: `useSessionStore`
   - As a Pinia store, providing:
      - `login(solidIdentityProvider: string, redirectUrl: string)`
      - `logout()`
      - `handleRedirectAfterLogin(redirectUrl: string)`
   - It handles the hooks automatically, using first-layer custom variables to keep reactivity.
      - Directly using properties in `Session` object will lose reactivity, for unknown reason.