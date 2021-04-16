//import { AuthState } from './../../store/auth.state';
//import { User } from './../../model/user';
import { Store } from '@ngrx/store';
//import { PasswordValidator } from './../../../shared/validators/password-validator';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
//import * as actions from './../../store/auth.actions';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  form: FormGroup;
  passwordGroup;

  constructor(
    private fb: FormBuilder,
   // private store: Store<AuthState>
  ) { }

  ngOnInit() {
  
  }

  onSignUp() {

  
  }

}
