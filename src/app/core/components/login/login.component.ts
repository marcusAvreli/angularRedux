//import { AuthState } from './../../store/auth.state';
import { Store, State } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
//import { AuthService } from './../../services/auth.service';
import { Component, OnInit, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators,ReactiveFormsModule,FormControl } from '@angular/forms';

import { LoginModel } from './../../models/login-model';
import { AccountService } from './../../account/account.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

	form: FormGroup;
	userForm:FormGroup;
    public loginModel: LoginModel;
	

	constructor(private fb: FormBuilder, public accountService: AccountService) { 
	}

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
	public onLogin(model : LoginModel):void {
		console.log("login START");
		console.log("Name:"+model.username);
		this.accountService.login(model).subscribe(() => {console.log(">>>>>>>>>>>>>>>>login successfull<<<<<<<<<<<<<<<<<")});
		//(errors: any) => {
		//this.errors.push(errors['error_description']);
		//});
		//this.store.dispatch(
		//  new actions.LoginRequestedAction({user: this.form.value})
		//);
		/*this.authService.signIn(this.form.value)
		.subscribe(user => {
		if (user.uid){
		this.router.navigate(['/home']);
		}
		});*/
	}
}
