import { Component } from '@angular/core';
import { UserService } from 'src/app/services/user/user.service';
import { SessionService } from 'src/app/services/user/session.service';
import { SearchService } from 'src/app/services/search.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent {
  term: string = '';
  showResults: boolean = false;
  savedUser;

  constructor(
    private service: SearchService,
    public userService: UserService,
  ) {
    this.savedUser = userService.getUserDetails();
  }

  searchTerm(term: string) {
    this.showResults = true;
    this.service.search(term).subscribe(response => {
      console.log(response);
    })
  };
}
