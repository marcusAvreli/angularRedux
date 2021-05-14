import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Response, Headers, RequestOptions, Http } from '@angular/http';
//import { JwtHelper } from 'angular2-jwt';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';

import { AppState } from '../../ngrx/reducers';
//import { ProfileModel } from '../models/profile-model';
import { LoginModel } from '../models/login-model';
import { LoggedInActions } from '../auth-store/logged-in.actions';
import { AuthTokenActions } from './auth-token.actions';
import { AuthReadyActions } from '../auth-store/auth-ready.actions';
//import { ProfileActions } from '../profile/profile.actions';
import { RefreshGrantModel } from '../models/refresh-grant-model';
import { AuthTokenModel } from '../models/auth-tokens-model';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/skip';
import 'rxjs/add/operator/takeUntil';
import 'rxjs/add/observable/of';
//import 'rxjs/add/observable/flatMap';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/observable/throw';
import { EnvService } from './../../env.service';



@Injectable()
export class AuthTokenService {
    public refreshSubscription$: Subscription;
    //public jwtHelper: JwtHelper = new JwtHelper();
    posts: any;
baseUrl:string;
    constructor(
	public env: EnvService,
        private http: Http,
        private store: Store<AppState>,
        private loggedInActions: LoggedInActions,
        private authTokenActions: AuthTokenActions,
        private authReadyActions: AuthReadyActions
		//,private profileActions: ProfileActions
    ) { 
	this.baseUrl=env.apiUrl;
	console.log(this.baseUrl);
	}

    public getTokens(data: LoginModel/* | RefreshGrantModel*/, grantType: string): Observable<void>{
        // data can be any since it can either be a refresh tokens or login details
        // The request for tokens must be x-www-form-urlencoded
		
		let myHeaders = new Headers();		
		myHeaders.append('Authorization', 'Basic '+window.btoa(data.username+":"+data.password)); 

		//headers.append('Content-Type', 'application/json'); 
		myHeaders.append('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
		myHeaders.append('Accept', 'application/json; charset=UTF-8'); 
		
		let myParams = new URLSearchParams();
		myParams.append('username', 'test@gmail.com');
		myParams.append('password', 'Password');
		myParams.append('hsid', 'password');
		console.log("Auth-Token: 2");
		
        const options = new RequestOptions({ headers: myHeaders, params: myParams });
		//let Observable<any> result = null;

        Object.assign(data, {
            grant_type: grantType,
            // offline_access is required for a refresh token
            scope: ['openid offline_access']
        });
/*		
		let body = new FormData();
body.append('username', 'emailId');
body.append('password', 'xyz');
*/
//let body = "username=body&password=body";

let body = `username=${data.username}&password=${data.password}`;
		const request = this.http.post(this.baseUrl+"/sessions/login", body, options);
		console.log("Auth-Token: 3");		
		
		return request.map(res => res.json())
           .map((tokens: AuthTokenModel) => {
				console.log("Auth-token: 4");
                const now = new Date();
                //tokens.expiration_date = new Date(now.getTime() + (tokens.expires_in ? (tokens.expires_in * 1000) : 0)).getTime().toString();
				console.log("Auth-token: 5");
				this.store.dispatch(this.authTokenActions.load(tokens));
                this.store.dispatch(this.loggedInActions.loggedIn());
				console.log("Auth-token:"+tokens.sessionKey);
                //const profile = this.jwtHelper.decodeToken(tokens.id_token ? tokens.id_token : '') as ProfileModel;
                //this.store.dispatch(this.profileActions.load(profile));

                localStorage.setItem('auth-tokens', JSON.stringify(tokens));
                this.store.dispatch(this.authReadyActions.ready());
            });

    }

    public deleteTokens() {
		const tokensString = localStorage.getItem('auth-tokens');
		 const tokensModel = tokensString === null ? null : JSON.parse(tokensString);
		 const sessionKey = tokensModel.sessionKey;
        localStorage.removeItem('auth-tokens');
		
		let headers = new Headers();		
		//headers.append('Authorization', 'Basic '+window.btoa(data.username+":"+data.password)); 
console.log("DeleteTokens. SessionKey: "+sessionKey);
		headers.append('Content-Type', 'application/json'); 
		headers.append('Accept', 'application/json'); 
		headers.append('session-key', sessionKey); 
		 const options = new RequestOptions({ headers });
		   this.store.dispatch(this.authTokenActions.delete());
		return this.http.post('http://localhost:8080/gameTournament/rest/users/logout', null, options).map(res => res.json());
      
    }

    public unsubscribeRefresh() {
        if (this.refreshSubscription$) {
            this.refreshSubscription$.unsubscribe();
        }
    }

   /* public refreshTokens(): Observable<Response> {
        return this.store.select(state => state.authState.authTokens);
            /*.first()
            .flatMap((tokens: any) => {
                return this.getTokens({ refresh_token: tokens.refresh_token }, 'refresh_token')
                    // This should only happen if the refresh token has expired
                    .catch((error: any) => {
                        // let the app know that we cant refresh the token
                        // which means something is invalid and they aren't logged in
                        this.loggedInActions.notLoggedIn();
                        return Observable.throw('Session Expired');
                    });
            });
    }*/

    public startupTokenRefresh() {
		console.log("StartUp Token Refresh STARTED");
        const tokensString = localStorage.getItem('auth-tokens');
		console.log("TokensString:"+tokensString);
        const tokensModel = tokensString === null ? null : JSON.parse(tokensString);
		console.log("TokenModel:"+tokensModel);
        return Observable.of(tokensModel)
            .flatMap(tokens => {
                // check if the token is even if localStorage, if it isn't tell them it's not and return
                if (!tokens) {
					console.log("StartUp Token Refresh_2");
                    this.store.dispatch(this.authReadyActions.ready());
                    return Observable.throw('No token in Storage');
                }
				console.log("StartUp Token Refresh_3");
                this.store.dispatch(this.authTokenActions.load(tokens));

                // the "+" below is to convert "tokens.expiration_date" to a number so we can compare
                if (+tokens.expiration_date > new Date().getTime()) {
                    // grab the profile out so we can store it
					console.log("auth-token:profiles");
             //       const profile: ProfileModel = this.jwtHelper.decodeToken(tokens.id_token);
               //     this.store.dispatch(this.profileActions.load(profile));
console.log("StartUp Token Refresh_4");
                    // we can let the app know that we're good to go ahead of time
                    this.store.dispatch(this.loggedInActions.loggedIn());
                    this.store.dispatch(this.authReadyActions.ready());
                }
					console.log("auth-token:refresh token");
               /* return this.refreshTokens()
                    .map(() => {
                        this.scheduleRefresh();
                    });*/
            })
            .catch(error => {
                this.store.dispatch(this.loggedInActions.notLoggedIn());
                this.store.dispatch(this.authReadyActions.ready());
				console.log("StartUp Token Refresh_5");
                return Observable.throw(error);
            });
			//console.log("StartUp Token Refresh_6");
    }

    public scheduleRefresh(): void {
        const source = this.store.select(state => state.auth.authTokens)
            .take(1)
            .flatMap((tokens: AuthTokenModel) => {
                // the interval is how long inbetween token refreshes
                // here we are taking half of the time it takes to expired
                // you may want to change how this time interval is calculated
                const interval = 1000;
				console.log("schedule refresh");
                return Observable.interval(interval);
            });

     /*   this.refreshSubscription$ = source.subscribe(() => {
            this.refreshTokens()
                .subscribe();
        });*/
    }

    private encodeObjectToParams(obj: any): string {
		console.log("encodeObjectToParams");
        return Object.keys(obj)
            .map(key => encodeURIComponent(key) + '=' + encodeURIComponent(obj[key]))
            .join('&');
    }

}