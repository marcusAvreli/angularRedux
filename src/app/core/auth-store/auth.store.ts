import { ActionReducer, combineReducers } from '@ngrx/store';
//import { ProfileModel } from '../models/profile-model';
//import { profileReducer } from '../profile/profile.reducer';
import { createSelector } from 'reselect';
import { authTokenReducer } from '../auth-token/auth-token.reducer';
import { authReadyReducer } from './auth-ready.reducer';
import { loggedInReducer } from './logged-in.reducer';
import { AuthTokenModel } from '../models/auth-tokens-model';
import 'rxjs/add/observable/of';
import { Observable } from 'rxjs/Observable';

export interface AuthState {
    authTokens: AuthTokenModel;
    //profile: ProfileModel;
    loggedIn: boolean;
    authReady: boolean;
}

const reducers = combineReducers({
  //  profile: profileReducer,
    authTokens: authTokenReducer,
    loggedIn: loggedInReducer,
    authReady: authReadyReducer
});

export function authReducer( state: any, action: any ): ActionReducer<AuthState> {
    return reducers(state, action);
}
export const getSpaceState = (state: AuthState) => state.loggedIn;
export const questionsSelector = state => state.questions

/*

*/
// const getAuthState2 :AuthState;
//export const getSpaceState = {state:true};;
export default reducers;
export const getIsUserLoggedIn = Observable.of(true);;
//export const getIsUserLoggedIn = (state: AuthState) => state.loggedIn;
export const getIds = (state: AuthState) => state.loggedIn;

//export const getSpaceMap = createSelector(getSpaceState.loggedIn, (true));



