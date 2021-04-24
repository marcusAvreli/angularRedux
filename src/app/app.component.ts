import { Component } from '@angular/core';
//import { AppState } from './ngrx/reducers';
import * as states from './ngrx/reducers';
//import * as  fromRoot  from './ngrx/reducers';
import {Store} from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { AuthState } from './core/auth-store/auth.store';
import { AuthTokenService } from './core/auth-token/auth-token.service';
import 'rxjs/add/operator/take';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
      public authState$: Observable<AuthState>;
testAuth : AuthState;
 // isAuthorized = false;
 public isAuthorized: Observable<boolean>;
// public isAuthorized: boolean;
  myState = {};
  public counter:Observable<boolean>;;
	constructor( public store: Store<states.AppState>,
	
	 private tokens: AuthTokenService) {
		
	}
	ngOnInit(): void {	 
	
		console.log("this is auth:"+this.isAuthorized);	
		this.authState$ = this.store.select(state => state.auth);
		this.authState$.subscribe(val => console.log("sss"+val.loggedIn));
	
	}
}
