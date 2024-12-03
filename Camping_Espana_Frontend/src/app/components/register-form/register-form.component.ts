import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RegisterData } from 'src/app/models/register-data';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.scss'],
})
export class RegisterFormComponent implements OnInit {
  registerForm!: FormGroup;
  registerData: RegisterData = {
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
  };
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
    this.registerForm = this.formBuilder.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
    });
  }

  register() {
    if (this.registerForm.valid) {
      console.log(this.registerForm);

      this.registerData.name = this.registerForm.get('username')!.value;
      this.registerData.email = this.registerForm.get('email')!.value;
      this.registerData.password = this.registerForm.get('password')!.value;
      this.registerData.password_confirmation =
        this.registerForm.get('confirmPassword')!.value;
      if (
        this.registerData.password_confirmation == this.registerData.password
      ) {
        this.auth.register(this.registerData).subscribe({
          next: (res) => {
            console.log(res);
            this.auth.getUser().subscribe({
              next: (user) => {
                this.router.navigate(['/map']);
              },
            });
          },
        });
      } else {
        this.registerForm
          .get('confirmPassword')!
          .setErrors({ incorrect: true });
      }
    }
  }
}
