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



@Injectable()
export class AuthTokenService {
    public refreshSubscription$: Subscription;
    //public jwtHelper: JwtHelper = new JwtHelper();
    posts: any;

    constructor(
        private http: Http,
        private store: Store<AppState>,
        private loggedInActions: LoggedInActions,
        private authTokenActions: AuthTokenActions,
        private authReadyActions: AuthReadyActions
		//,private profileActions: ProfileActions
    ) { }

    public getTokens(data: LoginModel/* | RefreshGrantModel*/, grantType: string): Observable<void>{
        // data can be any since it can either be a refresh tokens or login details
        // The request for tokens must be x-www-form-urlencoded
		console.log("Auth-Token: START");
       /* const headers = new Headers(
			{ 'Content-Type': 'application/json' },
			'Accept', 'application/json'
			{'Authorization': 'Basic '+window.btoa(data.username+":"+data.password)}
		
		
		
		);*/
		console.log("Auth-Token: 1");
		let headers = new Headers();
		//Authorization: `Basic ${currentUser.authdata}`
		//myHeaders.append('Authorization', 'Basic '+getBackObj.user.email+":"+getBackObj.user.password); 

		//headers.append('Authorization', 'Basic '+window.btoa("test@test2.com"+":"+"1234567")); 
			headers.append('Authorization', 'Basic '+window.btoa(data.username+":"+data.password)); 

		headers.append('Content-Type', 'application/json'); 
		headers.append('Accept', 'application/json'); 
		//headers.append('Access-Control-Allow-Origin', '*');
		//headers.append('Access-Control-Allow-Methods','GET, POST, PATCH, DELETE, PUT, OPTIONS');
		//headers.append('Access-Control-Allow-Headers', 'Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With');
		//headers.append('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');
		console.log("Auth-Token: 2");
        const options = new RequestOptions({ headers });
		//let Observable<any> result = null;

        Object.assign(data, {
            grant_type: grantType,
            // offline_access is required for a refresh token
            scope: ['openid offline_access']
        });
		//this.http.post('http://localhost:8080/gameTournament/rest/users/login', null, options).map(res => console.log(res.json()));
		const request = this.http.post('http://localhost:8080/gameTournament/rest/users/login', null, options);
//request.subscribe();
//request.subscribe(val => this.posts = val);
//this.posts= request.map(res => res.json());

console.log("Auth-Token: 3"+JSON.stringify(this.posts));
        //return this.http.post('http://localhost:8080/gameTournament/rest/users/login', this.encodeObjectToParams(data), options)
		//return this.http.post('http://localhost:8080/gameTournament1/rest/users/login1', null, options).map(res => res.json());
		
		//this.http.post('http://test', null, options).map(res => res.json());
		return this.http.post('http://localhost:8080/gameTournament/rest/users/login', null, options).map(res => res.json())
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
            });//.subscribe();

    }

    public deleteTokens() {
        localStorage.removeItem('auth-tokens');
        this.store.dispatch(this.authTokenActions.delete());
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