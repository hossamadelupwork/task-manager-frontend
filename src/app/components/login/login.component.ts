import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/providers/auth/auth.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Login } from 'src/app/models/login.model';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  constructor(private authService: AuthService,
              private spinner: NgxSpinnerService,
              private formBuilder: FormBuilder,
              private router: Router ) { }

  ngOnInit(): void {
    this.buildForm();
  }

  private buildForm(){
    this.loginForm = this.formBuilder.group({
      email: [
        'test@test.com',
        Validators.compose([
          Validators.required,
          Validators.email,
          Validators.maxLength(50),
        ]),
      ],
      password: [
        'test',
        Validators.compose([Validators.required]),
      ],
    });
  }

  async login(){
    if (this.loginForm.valid) {
      this.spinner.show();
      const params : Login = this.loginForm.value ;
      const result = await this.authService.login(params);
      if(result)
        this.router.navigate(['/pipelines']);

      this.spinner.hide();
    }
  }

}
