import { JsonPipe } from '@angular/common';
import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [JsonPipe],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  title = 'oauth-pkce-spa';

  constructor(private authService: AuthService) {}

  login(): void {
    this.authService.login(); // 启动授权码登录流程
    // this.oauthService.initLoginFlowInPopup(); // 启动弹出式登录流程
  }
  logout(): void {
    this.authService.logout(); // 登出
  }
  get isAuthenticated(): boolean {
    return this.authService.isAuthenticated; // (); // 检查访问令牌是否有效
  }
}
