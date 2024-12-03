import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginData } from 'src/app/models/login-data';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss'],
})
export class LoginFormComponent implements OnInit {
  loginForm!: FormGroup;
  loginData: LoginData = { email: '', password: '' };
  route!: string;

  constructor(
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private auth: AuthService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.url.subscribe((segments) => {
      this.route = segments.join('/');
    });
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  login() {
    if (this.loginForm.valid) {
      this.loginData.email = this.loginForm.get('email')!.value;
      this.loginData.password = this.loginForm.get('password')!.value;
      console.log(this.loginData);
      this.auth.login(this.loginData).subscribe({
        next: (res) => {
          console.log(res);
          this.auth.getUser().subscribe({
            next: (user) => {
              this.router.navigate(['/map']);
            },
          });
        },
      });
    }
  }
}
