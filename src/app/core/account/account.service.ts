import { Injectable } from '@angular/core';
import { RegisterModel } from '../models/register-model';
//import { Response, Http } from '@angular/http';
import { Response, Headers, RequestOptions, Http } from '@angular/http';
import { LoginModel } from '../models/login-model';
import { AuthTokenService } from '../auth-token/auth-token.service';
import { Store } from '@ngrx/store';
import { AppState } from '../../ngrx/reducers';
import { LoggedInActions } from '../auth-store/logged-in.actions';
import { AuthTokenActions } from '../auth-token/auth-token.actions';
//import { ProfileActions } from '../profile/profile.actions';
//import { UtilityService } from '../../core/services/utility.service';
import { Observable } from 'rxjs/Observable';
import { EnvService } from './../../env.service';

@Injectable()
export class AccountService {
baseUrl:string;
    constructor(
	public env: EnvService,
        private http: Http,
        private authTokens: AuthTokenService,
        private store: Store<AppState>,
        private loggedInAction: LoggedInActions,
        private authTokenActions: AuthTokenActions,
        /*private profileActions: ProfileActions,*/
       /* private utilityService: UtilityService*/
    ) { 
	this.baseUrl=env.apiUrl;
	console.log(this.baseUrl);
	}

    public register(data: RegisterModel): Observable<Response> {
		console.log("Register on account service");
		console.log("Going to call "+this.baseUrl+"/users/addUser");
		
		let myHeaders = new Headers();		
		

		//headers.append('Content-Type', 'application/json'); 
		myHeaders.append('Content-Type', 'application/json');
		myHeaders.append('Accept', 'application/json'); 
		
		let myParams = new URLSearchParams();
		myParams.append('username', 'test@gmail.com');
		myParams.append('password', 'Password');
		myParams.append('hsid', 'password');
		
		
        const options = new RequestOptions({ headers: myHeaders, params: myParams });
		
		
        return this.http.post(this.baseUrl+"/users/addUser", data,options)
            .catch(res => Observable.throw(res.json()));
    }

    public login(user: LoginModel) {
		console.log("Account Service Login START");
		//console.log(this.authTokens.getTokens(user, 'password').subscribe((data)=>{
		//console.log("Hello--------------------:"+data)}));
        return this.authTokens.getTokens(user, 'password')
	
            .catch(res => Observable.throw(res.json()));
           // .do(res => this.authTokens.scheduleRefresh());
    }

    public logout() {
        this.authTokens.deleteTokens();
        this.authTokens.unsubscribeRefresh();

        this.store.dispatch(this.loggedInAction.notLoggedIn());
        this.store.dispatch(this.authTokenActions.delete());
       // this.store.dispatch(this.profileActions.delete());
console.log("account.service:show login");
        //this.utilityService.navigateToSignIn();
    }

}