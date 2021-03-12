import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService, UserService } from '@/_services';
import { Router, ActivatedRoute } from '@angular/router';
import { User } from '@/_model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'C-Social';
  searchForm: FormGroup;
  isAuthenticated = false;
  user: User;
  loading = true;

  constructor(
  	private router: Router,
		private authenticationService: AuthenticationService,
		private userService: UserService
	) { }

  ngOnInit() {
  	this.searchForm = new FormGroup({
      query: new FormControl( '' ),
    });

		this.isAuthenticated = this.authenticationService.loggedIn;
		if( this.isAuthenticated ){
			this.userService.getById(this.authenticationService.getUser())
			.pipe()
			.subscribe(
				res => {
					this.user = res;
					this.loading = false;
			})
		}else{
			this.loading = false;
		}
	}

	logout(){
		this.authenticationService.logout();
		location.reload();				
	}

	search(){
		if(this.searchForm.value.query != ""){
			this.router.navigate([`search/${this.searchForm.value.query}`]);
		}
	}
}
