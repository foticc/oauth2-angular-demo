import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {OAuthErrorEvent, OAuthService} from 'angular-oauth2-oidc';
import {PKCE_AUTH_CONFIG} from "../auth-config";
import {BehaviorSubject, filter, from, mergeMap, Observable, of, tap} from "rxjs";

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  private isAuthenticatedSubject$ = new BehaviorSubject<boolean>(false);

  constructor(private oauthService: OAuthService, private router: Router) {
    this.oauthService.configure(PKCE_AUTH_CONFIG);
    this.oauthService.events.subscribe(event => {
      if (event instanceof OAuthErrorEvent) {
        console.error('OAuthErrorEvent Object:', event);
      } else {
        console.warn('OAuthEvent Object:', event);
      }
    });
    this.oauthService.events
      .subscribe(_ => {
        this.isAuthenticatedSubject$.next(this.oauthService.hasValidAccessToken());
      });
    this.isAuthenticatedSubject$.next(this.oauthService.hasValidAccessToken());

    // this.oauthService.events
    //   .pipe(filter(e => ['token_received'].includes(e.type)))
    //   .subscribe(e => this.oauthService.loadUserProfile());
    this.oauthService.events.subscribe(res=>{

    })
  }

  login() {
    this.oauthService.initCodeFlow();
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

  get isAuthenticated():boolean {
    this.oauthService.getAccessToken()
    return this.oauthService.hasValidAccessToken(); // 检查访问令牌是否有效
  }

  userInfo(): any {
    // this.oauthService.loadUserProfile().then((res) => {
    //   console.log(' ', res);
    // });
    return this.oauthService.getGrantedScopes(); // 获取用户信息 claims
  }

  test(): any {
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
