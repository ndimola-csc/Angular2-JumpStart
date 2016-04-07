import { Component } from 'angular2/core';
import { RouterLink, RouteParams } from 'angular2/router';
import { DataService } from '../shared/services/data.service';
import { SortByDirective } from '../shared/directives/sortby.directive';
import { Sorter } from '../shared/sorter';

@Component({ 
  selector: 'claims',
  providers: [DataService],
  templateUrl: 'app/claims/claims.component.html',
  directives: [RouterLink, SortByDirective]
})
export class ClaimsComponent {
	
	  title: string = 'Claims';
    filteredClaims: any[] = [];
    sorter: Sorter;

    constructor(private dataService: DataService, private _routeParams: RouteParams) {
      
    }
    
    ngOnInit() {
      let memberId = parseInt(this._routeParams.get('id'), 10);
      this.dataService.getClaims(memberId).subscribe((claims: any[]) => {
        this.filteredClaims = claims;
      });

      this.sorter = new Sorter();
    }

    sort(prop: string) {
        //Check for complex type such as 'state.name'
        if (prop && prop.indexOf('.')) {
          
        }
        this.sorter.sort(this.filteredClaims, prop);
    }
}
