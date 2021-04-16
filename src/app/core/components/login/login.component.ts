//import { AuthState } from './../../store/auth.state';
import { Store, State } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
//import { AuthService } from './../../services/auth.service';
import { Component, OnInit, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
//import { Router } from '@angular/router';
//import * as actions from './../../store/auth.actions';
//import * as states from './../../../ngrx/reducers';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form: FormGroup;

  constructor() { 
  }

  ngOnInit() {
   // this.initForm();
   console.log("login init");
  }

  
}
