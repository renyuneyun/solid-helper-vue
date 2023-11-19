import { defineStore } from 'pinia'
import { ISessionInfo, Session } from "@inrupt/solid-client-authn-browser";

export const useSessionStore = defineStore('session', {
  state: () => {
    return { 
      session: new Session(),
      info: undefined as ISessionInfo | undefined,
      isLoggedIn: false,
      webid: "",
     }
  },

  actions: {
    async login(solidIdentityProvider: string, redirectUrl: string, clientName?: string) {
      await this.session.login({
          oidcIssuer: solidIdentityProvider,
          clientName: clientName || "Vue application",
          redirectUrl: redirectUrl
      });
    },

    async handleRedirectAfterLogin(redirectUrl?: string, restorePreviousSession?: boolean): Promise<ISessionInfo | undefined> {
      this.session.onLogin(() => {
        this.webid = this.session.info.webId!;
        this.isLoggedIn = true;
      });

      this.session.onLogout(() => {
        this.webid = "";
        this.isLoggedIn = false;
      });

      this.session.onSessionRestore(() => {
        this.webid = this.session.info.webId!;
        this.isLoggedIn = true;
      });

      this.session.onSessionExpiration(() => {
        this.webid = "";
        this.isLoggedIn = false;
      })

      const info = await this.session.handleIncomingRedirect({
        url: redirectUrl,
        restorePreviousSession: restorePreviousSession,
      });

      this.info = info;

      return info;
    },

    async logout() {
      if (this.isLoggedIn) {
        this.session.logout();
      }
    }
  }
})