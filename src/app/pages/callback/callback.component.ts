import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-callback',
  standalone: true,
  imports: [],
  templateUrl: './callback.component.html',
  styleUrl: './callback.component.css',
})
export class CallbackComponent implements OnInit {
  code: string | null = '';
  state: string | null = '';

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.authService.tryLogin();
  }

  get isAuthenticated(): boolean {
    return this.authService.isAuthenticated; // 检查访问令牌是否有效
  }

  getAccessToken(): void {}
}
