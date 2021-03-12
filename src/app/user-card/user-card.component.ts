import { Component, Input, OnInit } from '@angular/core';
import { AuthenticationService } from '@/_services';
import { User } from '@/_model';

@Component({
  selector: 'user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.scss']
})
export class UserCardComponent implements OnInit {
	@Input('user') user: User;
	skills: any;
	isAuthenticated = false;

  constructor(
  	private auth: AuthenticationService,
  	) { }

  ngOnInit() {
  	this.skills = this.user.skills.replace(/\s|\[|\]|"/g, '').split(',');
  	if(this.auth.loggedIn)
  		this.isAuthenticated = true;
  }

}
