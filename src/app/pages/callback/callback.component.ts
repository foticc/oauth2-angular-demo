import {Component, inject, OnInit} from '@angular/core';
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-callback',
  standalone: true,
  imports: [],
  templateUrl: './callback.component.html',
  styleUrl: './callback.component.css'
})
export class CallbackComponent implements OnInit{

    private authservice: AuthService = inject(AuthService);

    ngOnInit(): void {
      if (this.authservice.isAuthenticated) {
        return;
      }
      this.authservice.tryLogin();
    }

}
