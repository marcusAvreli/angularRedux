import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {reducer} from "./ngrx/reducers";
import {StoreModule} from "@ngrx/store";
import { AppComponent } from './app.component';
import {CoreModule} from  './core/core.module';

import {PublicComponent} from './public/public.component';
//import {MemberComponent} from './member/member.component';


@NgModule({
  declarations: [
    AppComponent,
	   PublicComponent,
	//MemberComponent,
  ],
  imports: [
    BrowserModule,
	 CoreModule.forRoot(),
	 StoreModule.provideStore(reducer),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
