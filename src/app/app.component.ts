import { JsonPipe } from '@angular/common';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AuthConfig, OAuthService } from 'angular-oauth2-oidc';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, JsonPipe],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'oauth-pkce-spa';
  pkceAuthConfig: AuthConfig = {
    loginUrl: 'http://127.0.0.1:9000/oauth2/authorization',
    clientId: 'public-client',
    redirectUri: 'http://192.168.160.1:3000/',
    responseType: 'code',
    scope: 'openid profile email',
    postLogoutRedirectUri: 'http://127.0.0.1:9000/login',
    userinfoEndpoint: 'http://127.0.0.1:9000/userinfo',
    requireHttps: false,
    showDebugInformation: true,
  };

  constructor(private oauthService: OAuthService) {
    this.oauthService.configure(this.pkceAuthConfig);
    this.oauthService.loadDiscoveryDocumentAndTryLogin();
  }

  login(): void {
    this.oauthService.initCodeFlow(); // 启动授权码登录流程
  }
  logout(): void {
    this.oauthService.logOut(); // 登出
  }
  get isAuthenticated(): boolean {
    return this.oauthService.hasValidAccessToken(); // 检查访问令牌是否有效
  }
}
