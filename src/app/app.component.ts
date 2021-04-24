import { Component } from '@angular/core';
import * as states from './ngrx/reducers';
import {Store} from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { AuthState } from './core/auth-store/auth.store';
import { AuthTokenService } from './core/auth-token/auth-token.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
      public authState$: Observable<AuthState>;
testAuth : AuthState;
 
 public isAuthorized: boolean;

  myState = {};
  public counter:Observable<boolean>;;
	constructor( public store: Store<states.AppState>,
	
	 private tokens: AuthTokenService) {
		
	}
	ngOnInit(): void {	 
	
		console.log("this is auth:"+this.isAuthorized);	
		this.authState$ = this.store.select(state => state.auth);
		this.authState$.subscribe(val => this.isAuthorized =val.loggedIn);
	
	}
}
