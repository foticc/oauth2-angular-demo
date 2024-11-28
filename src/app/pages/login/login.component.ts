import {AsyncPipe, JsonPipe} from '@angular/common';
import {Component, inject, OnInit} from '@angular/core';
import { AuthService } from '../../services/auth.service';
import {Observable} from "rxjs";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [JsonPipe, AsyncPipe],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit{
  title = 'oauth-pkce-spa';

  private router:Router = inject(Router);

  constructor(private authService: AuthService) {

  }

  login(): void {
    this.authService.login();
  }
  logout(): void {
    this.authService.logout(); // 登出
  }
  get isAuthenticated():boolean {
    return this.authService.isAuthenticated; // (); // 检查访问令牌是否有效
  }

  ngOnInit(): void {
    // this.authService.tryLogin();
  }
}
