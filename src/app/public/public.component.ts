import {Component, OnInit,OnDestroy, Inject, ChangeDetectionStrategy,Pipe} from '@angular/core';
//import {TranslateService} from '@ngx-translate/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
// observable
import {Observable} from 'rxjs/Observable';
//import 'rxjs/add/operator/map';
//import 'rxjs/add/observable/from';
import { from } from 'rxjs/observable/from';
import * as Rx from 'RxJS';

@Component({
  selector: 'app-public',
  templateUrl: './public.component.html',
  styleUrls: ['./public.component.scss'],
  
})
export class PublicComponent implements OnInit, OnDestroy {

	constructor(){}
	ngOnInit(){ 
		console.log("init public");
	}
	ngOnDestroy() {
		console.log("destroy public");
	}	
}