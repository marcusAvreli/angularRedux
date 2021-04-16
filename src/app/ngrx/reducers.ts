import { createSelector } from 'reselect';
import { compose } from '@ngrx/core/compose';
import { storeFreeze } from 'ngrx-store-freeze';
import { combineReducers, ActionReducer } from '@ngrx/store';
import { environment } from '../../environments/environment';
import * as fromLoggedIn from './../core/auth-store/logged-in.reducer';
import * as fromAuthReady from './../core/auth-store/auth-ready.reducer';
import * as fromAuthState  from './../core/auth-store/auth.store';
//import { AuthState } from './../core/auth-store/auth.state';

export interface AppState {  
  //auth: AuthState;  
  authState: fromAuthState.AuthState;
 // authReady: fromAuthReady.State;
};

const reducers = {  
   //authReady: fromAuthReady.authReadyReducer,
   authReducer : fromAuthState.authReducer
   //loggedIn: fromLoggedIn.loggedInReducer,  
}

const developmentReducer: ActionReducer<AppState> = compose(storeFreeze, combineReducers)(reducers);
const productionReducer: ActionReducer<AppState> = combineReducers(reducers);

export function reducer(state: any, action: any) {
  if (environment.production) {
    return productionReducer(state, action);
  } else {
    return productionReducer(state, action);
  }
}
// AUTH
//export const getAuthState = (state: AppState) => state.authState;


//export const getAuthIsLoggedIn = createSelector(getAuthState.getLoggedIn, fromLoggedIn.authReducer);
