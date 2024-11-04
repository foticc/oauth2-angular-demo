import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [JsonPipe],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  text: any = null;
  token: any = null;

  constructor(private authservice: AuthService) {}
  ngOnInit(): void {
    this.text = this.authservice.userInfo();
    this.token = this.authservice.accessToken();
  }

  refreshToken() {
    this.authservice.refreshToken();
  }
}
