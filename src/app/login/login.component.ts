import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormControl, FormsModule } from '@angular/forms';
import { LoginService } from './login.service';
import jwt_decode from 'jwt-decode'
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  email:string;
  password:string;
  loginForm : FormGroup;
  submitted = false;
  error : any;
  errors : string;
  fieldTextType: boolean;
  constructor(
    private loginService : LoginService,
    private router : Router,
    private formBuilder : FormBuilder
  ) { 
    //form validation for email and password
    this.loginForm = this.formBuilder.group({
      email: new FormControl('', [Validators.required, Validators.email, Validators.pattern(/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/)]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)])
    });
  }

  ngOnInit(): void {
    // Check if user already logged in then redirect to dashboard
    if(localStorage.getItem("token")){
      this.router.navigate(['dashboard']);
    }
  }

  register()
  {
    this.router.navigateByUrl('register')
  }

  // to read the form controls 
  get f() { return this.loginForm.controls; }

  //to read the form's email 
  get mailId(): any {
    return this.loginForm.get('email')
  }

  //to read the form's password
  get pwd(): any {
    return this.loginForm.get('password')
  }

  login()
  {
    this.submitted = true;
    
    //control in forntend if form is invalid
    if(this.loginForm.invalid)
    {
      //console.log("invalid");
      return;
    }
    
    //proper data enetered in form then api call will be made
    this.loginService.getToken(this.mailId.value,this.pwd.value)
    .subscribe((response:any)=>
    {
      this.router.navigate(['/dashboard'])
    },
    error => {
      this.error = true;
      //if the users status is pending, inactive or invalid credentials are found the error will displayed
      this.errors = error.error.msg;
      
      console.log(error)
    })
  }

  // to toggle the hide/show icon
  toggleFieldTextType() {
    this.fieldTextType = !this.fieldTextType;
  }
}
