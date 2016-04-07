import { Component } from 'angular2/core';
import { ROUTER_DIRECTIVES, RouteConfig } from 'angular2/router';
import { MembersComponent } from './members/members.component';
import { ClaimsComponent } from './claims/claims.component';

@Component({ 
  selector: 'app-container',
  template: `<router-outlet></router-outlet>`,
  directives: [ROUTER_DIRECTIVES],
})
@RouteConfig([
  { path: '/', as: 'Members', component: MembersComponent, useAsDefault: true },
  { path: '/claims/:id', as: 'Claims', component: ClaimsComponent    }
])
export class AppComponent {
  
  constructor() {

  }
  
}
