import { Action } from '@ngrx/store';
import { AuthTokenActionTypes } from './auth-token.actions';
import { AuthTokenModel } from '../models/auth-tokens-model';

const initalState: AuthTokenModel = {
    //id_token: null,
    //access_token: null,
    //refresh_token: null,
    //expires_in: 0,
    //token_type: null,
   // expiration_date: null
	sessionKey: null
	// refresh_token:"1000"
};

export function authTokenReducer(state = initalState, action: Action): AuthTokenModel {
	console.log("authTokenReducer");
    switch (action.type) {
        case AuthTokenActionTypes.LOAD:
		console.log("authTokenReducer load");
            return action.payload;

        case AuthTokenActionTypes.DELETE:
		console.log("authTokenReducer delete");
            return initalState;

        default:
		console.log("authTokenReducer default"+state.sessionKey);
            return state;
    }
}