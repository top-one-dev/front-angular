import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService, PostService } from '@/_services';
import { MatSnackBar } from '@angular/material';
import { Post } from '@/_model';


@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {
	post: Post;
	isMine = false;
	loading = true;

  constructor(
  	private route: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar,
    private auth: AuthenticationService,
    private postService: PostService,
    ) { }

  ngOnInit() {
  	let postId;
  	this.route.params.subscribe(params => {
      postId = params.id;      
      this.postService.getById(postId)
      .pipe()
      .subscribe(
        res => {
          this.post = res;
          if(this.auth.loggedIn)
            this.isMine = +this.auth.getUser() == res.user.id;
          this.loading = false;
        })
    });        
  }

  deletePost(){
    this.postService.delete(this.post.id)
    .subscribe(
        res => {
          this.snackBar.open(res.message, 'OK', {
            verticalPosition: 'top',
            horizontalPosition: 'right'
          });
          this.router.navigate(['home']);
        }
      )    
  }

}
