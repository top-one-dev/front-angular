import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { GalleryComponent } from './gallery/gallery.component';
import { AppRoutingModule } from './app-routing.module';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { ProfileComponent } from './profile/profile.component';
import { EditprofileComponent, AvatarEditDialog } from './editprofile/editprofile.component';
import { PostComponent } from './post/post.component';
import { PostCardComponent } from './post-card/post-card.component';
import { CommentComponent } from './comment/comment.component';
import { ReplyComponent } from './reply/reply.component';
import { MessageComponent } from './message/message.component';
import { AvatarRenderPipe } from './_pipe/';
import { SearchComponent } from './search/search.component';
import { UserCardComponent } from './user-card/user-card.component';

import { NgMasonryGridModule } from 'ng-masonry-grid';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FlexLayoutModule } from '@angular/flex-layout';
import { QuillModule } from 'ngx-quill';
import { AngularCropperjsModule } from 'angular-cropperjs';
import { NgSelectModule } from '@ng-select/ng-select';
import { JwtModule } from '@auth0/angular-jwt';
import { MomentModule } from 'ngx-moment';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatToolbarModule, 
         MatMenuModule, 
         MatButtonModule, 
         MatIconModule, 
         MatBadgeModule,
         MatFormFieldModule,
         MatInputModule,
         MatSelectModule,
         MatCheckboxModule,
         MatDividerModule,
         MatChipsModule,
         MatDialogModule, 
         MatProgressSpinnerModule,
         MatProgressBarModule,
         MatSnackBarModule,
         MatCardModule,
         MatTreeModule,
         MatExpansionModule,
         MatGridListModule, } from '@angular/material';

import { SocialLoginModule, AuthServiceConfig } from "angularx-social-login";
import { GoogleLoginProvider, FacebookLoginProvider, LinkedInLoginProvider} from "angularx-social-login";

let config = new AuthServiceConfig([
  {
    id: GoogleLoginProvider.PROVIDER_ID,
    provider: new GoogleLoginProvider("Google-OAuth-Client-Id")
  },
  {
    id: FacebookLoginProvider.PROVIDER_ID,
    provider: new FacebookLoginProvider("Facebook-App-Id")
  },
  {
    id: LinkedInLoginProvider.PROVIDER_ID,
    provider: new LinkedInLoginProvider("LinkedIn-client-Id", false, 'en_US')
  }
]);

export function provideConfig() {
  return config;
}

@NgModule({
  declarations: [
    AppComponent,
    GalleryComponent,
    LoginComponent,
    SignupComponent,
    ProfileComponent,
    EditprofileComponent,
    AvatarEditDialog,
    PostComponent,
    PostCardComponent,
    CommentComponent,
    ReplyComponent,
    MessageComponent,
    AvatarRenderPipe,
    SearchComponent,
    UserCardComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    NgMasonryGridModule,
    HttpClientModule,
    FlexLayoutModule,
    QuillModule,
    AngularCropperjsModule,
    NgSelectModule,
    ReactiveFormsModule,
    MomentModule,
    MatToolbarModule,
    MatMenuModule,
    MatButtonModule,
    MatIconModule,
    MatBadgeModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatCheckboxModule,
    MatDividerModule,
    MatChipsModule,
    MatDialogModule,
    MatProgressSpinnerModule,
    MatProgressBarModule,
    MatSnackBarModule,
    MatCardModule,
    MatTreeModule,
    MatExpansionModule,
    MatGridListModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: function  tokenGetter() {
             return  localStorage.getItem('auth_token');},
        authScheme: 'Bearer ',
        whitelistedDomains: ['localhost:3000'],
        blacklistedRoutes: ['http://localhost:3000/login']
      }
    }),
    SocialLoginModule
  ],
  entryComponents: [AvatarEditDialog],
  providers: [{
      provide: AuthServiceConfig,
      useFactory: provideConfig
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
