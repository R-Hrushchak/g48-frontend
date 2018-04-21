import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router) {
  }

  login(event, username, password) {
    event.preventDefault();
    this.authService.login(username, password)
      .subscribe(
        response => {
          localStorage.setItem('token', response.access_token);
          this.router.navigateByUrl('');
        },
        error => {
          alert(error);
        }
      );
  }

  ngOnInit() {

  }

}
