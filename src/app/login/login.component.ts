import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {LoginService} from '../auth/login.service';
import {User} from '../model/user';

// @ts-ignore
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
    // @ts-ignore
  loginForm: FormGroup;
  user: User[] = [];
  password = '';
  username = '';
  constructor(private fb: FormBuilder,
              private loginService: LoginService,
              private router: Router)
  { }

  isValidInput(fieldName: string | number): boolean {
    return this.loginForm.controls[fieldName].invalid &&
      (this.loginForm.controls[fieldName].dirty || this.loginForm.controls[fieldName].touched);
  }


  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
  this.loginForm = this.fb.group({
    username: ['', Validators.required],
    password: ['', Validators.required]
  });
  }

  isLogin(): void {
    this.loginService.login(this.username, this.password).subscribe(
      res => {
            if (res) {
                // @ts-ignore
              localStorage.setItem('token', res.token);
              this.router.navigateByUrl('/listUsers');
             } else {
               this.router.navigateByUrl('/login');
             }
      });
  }
}
