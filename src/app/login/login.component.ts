import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from '@/_services';
import { first } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material';
import { AuthService } from "angularx-social-login";
import { FacebookLoginProvider, GoogleLoginProvider, LinkedInLoginProvider } from "angularx-social-login";

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
	loginForm: FormGroup;
	loading = false;

	constructor(
		private router: Router,
		private authenticationService: AuthenticationService,
		private snackBar: MatSnackBar,
		private authService: AuthService,
		) { }

	ngOnInit() {
		if( this.authenticationService.loggedIn )
			this.router.navigate(['home']);
		this.loginForm = new FormGroup({
			email: new FormControl('', [Validators.required, Validators.email]),
			password: new FormControl('', [Validators.required])
		});
	}

	public hasError = (controlName: string, errorName: string) =>{
		return this.loginForm.controls[controlName].hasError(errorName);
	}

	get f() { return this.loginForm.controls; }

	login(){
		var _this = this;
		if (this.loginForm.valid) {
			this.loading = true;
			this.authenticationService.login(this.loginForm.value.email, this.loginForm.value.password)
			.pipe(first())
			.subscribe(
				data => {
					location.reload();
					this.router.navigate(['home']);				  					
				},
				res => {
					this.snackBar.open(res.error.message, 'OK', {
						verticalPosition: 'top',
						horizontalPosition: 'right'
					});
					this.loading = false;
				});
		}else{
			console.log("form is not valid...")
		}
	}

	signInWithGoogle(): void {
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID).then(
    		(value) => { 
    			this.authenticationService.login_with_social(value.authToken, 'google')
    				.pipe(first())
    				.subscribe(
    						res =>	{ 
    							location.reload();
									this.router.navigate(['home']);
    						 }
    					)
    		}
    	);
  }
 
  signInWithFB(): void {
    this.authService.signIn(FacebookLoginProvider.PROVIDER_ID).then(
    		(value) => { 
    			this.authenticationService.login_with_social(value.authToken, 'facebook')
    				.pipe(first())
    				.subscribe(
    						res =>	{ 
    							location.reload();
									this.router.navigate(['home']);
    						 }
    					)
    		}
    	);
    
  }
  
  signInWithLinkedIn(): void {
    this.authService.signIn(LinkedInLoginProvider.PROVIDER_ID).then(
    		(value) => {
    			console.log(value);
    			this.authenticationService.login_with_social(value.authToken, 'linkedin')
    				.pipe(first())
    				.subscribe(
    						res =>	{ 
    							location.reload();
									this.router.navigate(['home']);
    						 }
    					)
    		}
    	)
  }

}
