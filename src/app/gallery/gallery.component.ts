import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthenticationService, UserService } from '@/_services';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss', '../../../node_modules/ng-masonry-grid/ng-masonry-grid.css']
})
export class GalleryComponent implements OnInit {

	isAuthenticated = false;
	masonryItems;
  posts;

  constructor(
    private http: HttpClient,
    private authenticationService: AuthenticationService,
    private userService: UserService,
  ) { }

  ngOnInit() {
    this.isAuthenticated = this.authenticationService.loggedIn;
    if( !this.isAuthenticated ){
      this.http.get(`${environment.apiUrl}/gallery`)
      .subscribe( res => {
        this.masonryItems = res;
      });  
    }else{
      this.userService.feed()
      .subscribe( res => {
        this.posts = res;
      })
    }    	
  }

}
