import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService, UserService, MessageService } from '@/_services';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss']
})
export class MessageComponent implements OnInit {
	loading = true;
	users: any;
	selectedUser: any;
	conversations: any;
	messages: any;

  constructor(
  		private authService: AuthenticationService,
  		private userService: UserService,
  		private messageService: MessageService,
  		private router: Router,
  	) { }

  ngOnInit() {
  	if (!this.authService.loggedIn)
  		this.router.navigate(['login']);
  	else{
  		this.userService.getAll()
	  		.subscribe( res => {
	  			this.users = res;
	  			this.selectedUser = res[0];
	  			this.loading = false;
	  		})
	  	this.messageService.getConversations().subscribe(
	  		res => {
	  			this.conversations = res;
	  		})	
  	}  	
  }

  selectUser(id){  	
  	this.selectedUser = this.users.find( user => user.id === id );
  	let messages = this.conversations.find( c => c.users.find( u => u.id === id ));
  	if(messages)
  		this.messages = messages.cmessages;
  	else
  		this.messages = null;
  	
  }

}
