import { Component } from 'angular2/core';
import { RouterLink } from 'angular2/router';
import { DataService } from '../shared/services/data.service';
import { Sorter } from '../shared/sorter';
import { FilterTextboxComponent } from './filterTextbox.component';
import { SortByDirective } from '../shared/directives/sortby.directive';
import { CapitalizePipe } from '../shared/pipes/capitalize.pipe';
import { CapitalizeAllPipe } from '../shared/pipes/tocaps.pipe';
import { TrimPipe } from '../shared/pipes/trim.pipe';

@Component({ 
  selector: 'members', 
  providers: [DataService],
  templateUrl: 'app/members/members.component.html',
  directives: [RouterLink, FilterTextboxComponent, SortByDirective],
  pipes: [CapitalizePipe, TrimPipe, CapitalizeAllPipe]
})
export class MembersComponent {

  title: string;
  filterText: string;
  listDisplayModeEnabled: boolean;
  members: any[] = [];
  filteredMembers: any[] = [];
  sorter: Sorter;

  constructor(private dataService: DataService) { }
  
  ngOnInit() {
    this.title = 'Members';
    this.filterText = 'Filter Members:';
    this.listDisplayModeEnabled = false;

    this.dataService.getMembers()
        .subscribe((members:any[]) => {
          this.members = this.filteredMembers = members;
        });

    this.sorter = new Sorter();
  }

  changeDisplayMode(mode: string) {
      this.listDisplayModeEnabled = (mode === 'List');
  }

  filterChanged(data: string) {
    if (data && this.members) {
        data = data.toUpperCase();
        let props = ['firstName', 'lastName', 'address', 'city', 'state', 'zip'];
        let filtered = this.members.filter(item => {
            let match = false;
            for (let prop of props) {
                //console.log(item[prop] + ' ' + item[prop].toUpperCase().indexOf(data));
                if (item[prop].toString().toUpperCase().indexOf(data) > -1) {
                  match = true;
                  break;
                }
            };
            return match;
        });
        this.filteredMembers = filtered;
    }
    else {
      this.filteredMembers = this.members;
    }
  }

  deleteMember(id: number) {

  }

  sort(prop: string) {
      //Check for complex type such as 'state.name'
      if (prop && prop.indexOf('.')) {
        
      }
      this.sorter.sort(this.filteredMembers, prop);
  }

}
