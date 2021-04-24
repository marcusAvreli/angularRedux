import {NgModule, Optional, SkipSelf,ModuleWithProviders} from '@angular/core';
import {LoginComponent} from './components/login/login.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { AuthTokenService } from './auth-token/auth-token.service';
import { LoggedInActions } from './auth-store/logged-in.actions';
import { AuthTokenActions } from './auth-token/auth-token.actions';
import { AuthReadyActions } from './auth-store/auth-ready.actions';
import { AccountService } from './account/account.service';
//import { DataService } from './services/data.service';
//import { UtilityService } from './services/utility.service';

@NgModule({
	imports: [FormsModule,ReactiveFormsModule],
	exports: [LoginComponent],
	declarations: [LoginComponent],
	providers: []
})
export class CoreModule {
	
	 public static forRoot(): ModuleWithProviders {
        return {
            ngModule: CoreModule,
            providers: [
                // Providers
               // Title,
                AuthTokenService,
                AccountService,
                LoggedInActions,
                //ProfileActions,
                AuthTokenActions,
                AuthReadyActions,
                //DataService,
                //UtilityService*/
            ],
			//
        };
    }
	constructor(@Optional() @SkipSelf() parentModule: CoreModule) {   
	 if (parentModule) {
            throw new Error('CoreModule is already loaded. Import it in the AppModule only');
        }
	}
}