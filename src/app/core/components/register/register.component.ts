//import { AuthState } from './../../store/auth.state';
//import { User } from './../../model/user';
import { Store } from '@ngrx/store';
//import { PasswordValidator } from './../../../shared/validators/password-validator';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators,ReactiveFormsModule,FormControl } from '@angular/forms';
//import * as actions from './../../store/auth.actions';
import { RegisterModel } from './../../models/register-model';
import { AccountService }  from './../../account/account.service';
import { Response } from '@angular/http';



@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
 public errors: string[] = [];
  userForm: FormGroup;
  passwordGroup;

  constructor(public accountService: AccountService,
    private fb: FormBuilder,
   // private store: Store<AuthState>
  ) { }

  ngOnInit() {
		this.initForm();
		console.log("login init");
	}

	initForm(){		
		this.userForm = new FormGroup({
			username: new FormControl(),
			password: new FormControl()
		}); 	
	}

  onRegister(model: RegisterModel) {
	  console.log("Register called");
	  model.lastName="testLastName";
	  model.firstName="testLastName";
	  model.role="Role";
	  model.email="test";
	this.accountService.register(model).subscribe((res: Response) => {
				if(res){
                console.log(res);
				}
            },
            (errors: string[]) => {
                this.errors = errors;
            });;


  
  }

}
