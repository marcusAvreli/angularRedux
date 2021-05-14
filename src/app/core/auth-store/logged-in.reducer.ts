import { LoggedInActionTypes } from './logged-in.actions';
import { Action } from '@ngrx/store';

const initalState = false;

export const loggedInReducer = (state = initalState, action: Action): boolean => {
    switch (action.type) {
        case LoggedInActionTypes.LOGGED_IN:
			console.log("logged in");
            return true;

        case LoggedInActionTypes.NOT_LOGGED_IN:
		console.log("not logged in");
            return false;

        default:
		console.log("default");
		console.log("logged-in.reducer.default.state==>"+state);
            return state;
    }
};
//export const getEntities = (state: State) => state;
//export default loggedInReducer ;
//export const getIsUserLoggedIn = true;
//export const isVisible = () => visible;



