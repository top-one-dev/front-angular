import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { AuthenticationService, CommentService, ReplyService } from '@/_services';
import { MatSnackBar } from '@angular/material';
import { Post, Comment } from '@/_model';

@Component({
  selector: 'comment',
  templateUrl: './comment.component.html',
	})
export class CommentComponent implements OnInit {
  @Input('comment') data: Comment;
  @Input('post') post: Post;
  @Output()
    delete = new EventEmitter<number>();
  isMine = false;
  isAuthenticated = false;
  replyForm: FormGroup;
  preview: any;
  attach: any;

  constructor(
  	private auth: AuthenticationService,
  	private snackBar: MatSnackBar,
  	private commentService: CommentService,
    private replyService: ReplyService,
  	private sanitizer:DomSanitizer,
  	){}

  ngOnInit(){
  	if(this.auth.loggedIn){
  		this.isAuthenticated = true;
  		this.isMine = +this.auth.getUser() == this.data.user.id;
  		this.replyForm = new FormGroup({
        content: new FormControl( '', [Validators.required] )
      });
  	}
  }

  deleteComment(){
    this.commentService.delete(this.post.id, this.data.id)
      .subscribe(
          res => {
            this.snackBar.open( res.message, 'OK', {
              verticalPosition: 'top',
              horizontalPosition: 'right'
            });
            this.delete.emit(this.data.id);
        })
  }

  createReply(){
    if(this.replyForm.valid){
      let formData: FormData = new FormData();
      formData.append('content', this.replyForm.value.content);
      formData.append('attach', this.attach);
  	  this.replyService.create(this.post.id, this.data.id, formData )
        .subscribe(
            res => {
              this.data.replies.push(res);
              this.snackBar.open( "Replied successfully!", 'OK', {
                verticalPosition: 'top',
                horizontalPosition: 'right'
              });
              this.resetReplyForm();
          })
    }
  }

  resetReplyForm(){
    this.replyForm.reset();
    this.preview = this.attach = null;
  }

  onFileSelected(event){
  	this.preview = this.transform(URL.createObjectURL(event.target.files[0]));
    this.attach = event.target.files[0];
  }

  transform(url) {
    return this.sanitizer.bypassSecurityTrustUrl(url);
  }

  deleteReply(id){
    let replies = this.data.replies;
    replies = replies.filter( reply => reply.id != id );
    this.data.replies = replies;
  }

}