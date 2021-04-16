import {NgModule, Optional, SkipSelf,ModuleWithProviders} from '@angular/core';
import {LoginComponent} from './components/login/login.component';

@NgModule({
	imports: [],
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
               /* Title,
                AuthTokenService,
                AccountService,
                LoggedInActions,
                ProfileActions,
                AuthTokenActions,
                AuthReadyActions,
                DataService,
                UtilityService*/
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