import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService, UserService, PostService } from '@/_services';
import { MatSnackBar } from '@angular/material';
import { User } from '@/_model';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
	user: User;
  posts: any;
  skills: any;
  isMine = false;
  loading = true;
  isFollowing = false;
  postForm: FormGroup;
  isAuthenticated = false;

  constructor(
    private route: ActivatedRoute,
    private auth: AuthenticationService,
    private userService: UserService,
    private postService: PostService,
    private snackBar: MatSnackBar,
   ) { }

  ngOnInit() {
    let userId;
    this.route.params.subscribe(params => {
      userId = params.id;
      if(this.auth.loggedIn){
        this.isMine = +this.auth.getUser() == userId;
        this.isAuthenticated = true;
      }
      this.userService.getById(userId)
        .pipe()
        .subscribe(
          res => {
            this.user = res;
            this.posts = res.posts;
            this.skills = res.skills.replace(/\s|\[|\]|"/g, '').split(',');
            this.loading = false;
            if(this.auth.loggedIn){
              if( res.followers.some(follower => +this.auth.getUser() === follower.id) )
                this.isFollowing = true;
              else
                this.isFollowing = false;
              this.postForm = new FormGroup({
                title: new FormControl( '', [Validators.required] ),
                content: new FormControl( '', [Validators.required] )
              });
            }              
          })
    });    
  }

  follow(){
    if(this.isFollowing)
      this.userService.unfollow(this.user.id)
        .subscribe(
          res => {
            this.isFollowing = false;
            let followers = this.user.followers;
            followers = followers.filter( follower => follower.id != +this.auth.getUser() );
            this.user.followers = followers;
          })
    else
      this.userService.follow(this.user.id)
        .subscribe(
          res => {
            this.isFollowing = true;
            this.userService.getById(+this.auth.getUser())
              .subscribe(
                res => {
                  this.user.followers.push(res);
                })            
          })
  }

  createPost(){
    if(this.postForm.valid){
      this.postService.create(this.postForm.value)
        .subscribe( 
          res => {
            delete res.user;
            this.posts.push(res);
            this.snackBar.open( "Posted successfully!", 'OK', {
                verticalPosition: 'top',
                horizontalPosition: 'right'
              });
            this.postForm.reset();
          })
    }else{
      console.log("invalid form ....");
    }
  }

  resetPostForm(){
    this.postForm.reset();
  }

  deletePost(id){
    let posts = this.posts;
    posts = posts.filter( post => post.id != id );
    this.posts = posts;
  }

}
