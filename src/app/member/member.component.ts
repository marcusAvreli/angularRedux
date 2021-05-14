import {Component, OnInit,OnDestroy, Inject, ChangeDetectionStrategy,Pipe} from '@angular/core';
//import {TranslateService} from '@ngx-translate/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
// observable
//import {Observable} from 'rxjs/Observable';
//import 'rxjs/add/operator/map';
//import 'rxjs/add/observable/from';
/*import { from } from 'rxjs/observable/from';

import { Observable } from 'rxjs/Rx';
import { Store } from '@ngrx/store';
import { AuthState } from './../auth/store/auth.state';
import * as actions from './../auth/store/auth.actions';
import * as states from './../ngrx/reducers';*/
import { AccountService } from './../core/account/account.service';
import * as Rx from 'RxJS';

@Component({
  selector: 'app-member',
  templateUrl: './member.component.html',
  styleUrls: ['./member.component.scss'],
  
})
export class MemberComponent implements OnInit, OnDestroy {
 // user$: Observable<any>;

	 constructor( public accountService: AccountService,/*,private router: Router private store: Store<states.AppState>*/) { 
  }
   

	ngOnInit(){ 
		console.log("init member");
		//console.log("Get Token:"+this.getToken());
		/*var json = JSON.stringify(this.getToken());
		var getBackObj  = JSON.parse(json);
		console.log("Get Token:"+getBackObj);
		console.log("Get Token:"+json);
		 this.user$ = this.store.select(states.getAuthUserData);
		 this.user$.subscribe(console.log);*/
	}
	ngOnDestroy() {
		console.log("destroy member");
	}
 onLogout(){
	 console.log("logout called");
	 this.accountService.logout();
   /* this.store.dispatch(
      new actions.LogoutRequestedAction({user:this.getToken()})
    );*/
  }	
}