declare module 'intuit-oauth' {
  interface OAuthConfig {
    clientId: string;
    clientSecret: string;
    environment: 'sandbox' | 'production';
    redirectUri: string;
  }

  class OAuthClient {
    constructor(config: OAuthConfig);
    
    authorizeUri(params: {
      scope: string;
      state?: string;
    }): string;
    
    createToken(uri: string): Promise<any>;
    
    refresh(): Promise<any>;
    
    revoke(): Promise<any>;
    
    isAccessTokenValid(): boolean;
    
    getToken(): any;
  }

  export = OAuthClient;
}
