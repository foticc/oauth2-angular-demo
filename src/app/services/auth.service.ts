import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthConfig, OAuthService } from 'angular-oauth2-oidc';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  pkceAuthConfig: AuthConfig = {
    issuer: 'http://127.0.0.1:9000',
    loginUrl: 'http://127.0.0.1:9000/oauth2/authorize',
    clientId: 'public-client',
    redirectUri: 'http://127.0.0.1:3000/',
    responseType: 'code',
    scope: 'openid profile email',
    tokenEndpoint: 'http://127.0.0.1:9000/oauth2/token',
    postLogoutRedirectUri: 'http://127.0.0.1:3000/',
    userinfoEndpoint: 'http://127.0.0.1:9000/userinfo',
    requireHttps: false,
    showDebugInformation: true,
    logoutUrl:"http://127.0.0.1:9000/connect/logout",
  };
  constructor(private oauthService: OAuthService, private router: Router) {
    this.oauthService.configure(this.pkceAuthConfig);
    this.oauthService.setStorage(localStorage)
    // this.oauthService.loadDiscoveryDocumentAndTryLogin().then(r => console.log(r));
    this.oauthService.events.subscribe(res=>{
      console.log(res);
    })
  }

  login(): void {
    // this.oauthService.initCodeFlow(); // 启动授权码登录流程
    // this.oauthService.initLoginFlowInPopup(); // 启动弹出式登录流程
    this.oauthService.initLoginFlow();
  }
  logout(): void {
    // this.oauthService.revokeTokenAndLogout()
    // this.oauthService.revokeTokenAndLogout()
    //   .then(res=>{
    //     console.log(res);
    //     this.router.navigate(['/']);
    //   });
    this.oauthService.logOut(); // 登出
  }
  get isAuthenticated(): boolean {
    return this.oauthService.hasValidAccessToken(); // 检查访问令牌是否有效
  }

  userInfo(): any {
    this.oauthService.loadUserProfile().then((res) => {
      console.log(' ', res);
    });
    return this.oauthService.getGrantedScopes(); // 获取用户信息 claims
  }

  test():any {
    console.log(this.oauthService.postLogoutRedirectUri);
    // @ts-ignore
    console.log(this.oauthService.logoutUrl.indexOf('{{') > -1);
    const postLogoutUrl = this.oauthService.postLogoutRedirectUri ||
      (this.oauthService.redirectUriAsPostLogoutRedirectUriFallback && this.oauthService.redirectUri) ||
      '';
    console.log(postLogoutUrl);
  }

  refreshToken() {
    this.oauthService.refreshToken().then((res) => {
      console.log('refresh token success', res);
    });
  }

  accessToken(): string {
    // 获取访问令牌
    return `Bearer ${this.oauthService.getAccessToken()}`;
  }

  tryLogin(isPop = false): void {
    this.oauthService.tryLogin().then(
      () => {
        this.router.navigate(['/home']);
      },
      () => {
        this.router.navigate(['/login']);
      }
    );
  }
}
