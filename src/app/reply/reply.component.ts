import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { AuthenticationService, ReplyService } from '@/_services';
import { MatSnackBar } from '@angular/material';
import { Post, Comment, Reply } from '@/_model';

@Component({
  selector: 'reply',
  templateUrl: './reply.component.html' 
	})
export class ReplyComponent implements OnInit {
  @Input('reply') data: Reply;
  @Input('post') post: Post;
  @Input('comment') comment: Comment;
  @Output()
    delete = new EventEmitter<number>();
  isMine = false;

  constructor(
  	private auth: AuthenticationService,
  	private snackBar: MatSnackBar,
  	private replyService: ReplyService,
  	){}

  ngOnInit(){
  	if(this.auth.loggedIn)
  		this.isMine = +this.auth.getUser() == this.data.user.id;
  }

  deleteReply(){
    this.replyService.delete(this.post.id, this.comment.id, this.data.id)
      .subscribe(
          res => {
            this.snackBar.open( res.message, 'OK', {
              verticalPosition: 'top',
              horizontalPosition: 'right'
            });
            this.delete.emit(this.data.id);
        })    
  }
}