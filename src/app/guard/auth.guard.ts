import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    if (this.authService.isAuthenticated) {
      // 检查用户是否登录
      return true; // 允许访问
    } else {
      this.router.navigate(['/login']); // 重定向到登录页面
      return false; // 阻止访问
    }
  }
}
