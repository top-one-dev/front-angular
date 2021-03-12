import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { AuthenticationService, PostService, CommentService } from '@/_services';
import { MatSnackBar } from '@angular/material';
import { Post, User } from '@/_model';

@Component({
  selector: 'postCard',
  templateUrl: './post-card.component.html'
	})
export class PostCardComponent implements OnInit {
  @Input('post') data: Post;
  @Input('user') user: User;
  @Output()
    delete = new EventEmitter<number>();
  isMine = false;
  isAuthenticated = false;
  commentForm: FormGroup;
  preview: any;
  attach: any;

  constructor(
  	private auth: AuthenticationService,
  	private snackBar: MatSnackBar,
  	private postService: PostService,
    private commentService: CommentService,
  	private sanitizer:DomSanitizer,
  	){}

  ngOnInit(){
  	if(this.auth.loggedIn){
  		this.isAuthenticated = true;
  		if(this.data.user)
	  		this.isMine = +this.auth.getUser() == this.data.user.id;
	  	if(this.user)
	  		this.isMine = +this.auth.getUser() == this.user.id;
	  	
	  	this.commentForm = new FormGroup({
        content: new FormControl( '', [Validators.required] )
      });  	
  	}	  	
  }

  deletePost(){
    this.postService.delete(this.data.id)
    .subscribe(
        res => {
          this.snackBar.open(res.message, 'OK', {
            verticalPosition: 'top',
            horizontalPosition: 'right'
          });
          this.delete.emit(this.data.id);
        }
      )  	
  }

  createComment(){
  	if(this.commentForm.valid){
      let formData: FormData = new FormData();
      formData.append('content', this.commentForm.value.content);
      formData.append('attach', this.attach);
      this.commentService.create(this.data.id, formData )
        .subscribe(
            res => {
              this.data.comments.push(res);
              this.snackBar.open( "Commented successfully!", 'OK', {
                verticalPosition: 'top',
                horizontalPosition: 'right'
              });
              this.resetCommentForm();
          })
    }
  }

  resetCommentForm(){
    this.commentForm.reset();
    this.preview = this.attach = null;
  }

  onFileSelected(event){
  	this.preview = this.transform(URL.createObjectURL(event.target.files[0]));
    this.attach = event.target.files[0];
  }

  transform(url) {
    return this.sanitizer.bypassSecurityTrustUrl(url);
  }

  deleteComment(id){
    let comments = this.data.comments;
    comments = comments.filter( comment => comment.id != id );
    this.data.comments = comments;
  }
}