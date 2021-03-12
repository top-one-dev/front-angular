import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthenticationService, UserService } from '@/_services';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { DomSanitizer } from '@angular/platform-browser';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { CropperComponent } from 'angular-cropperjs';
import { MatSnackBar } from '@angular/material';
import { User } from '@/_model';

export interface DialogData {
  imageUrl: any
}

@Component({
  selector: 'app-editprofile',
  templateUrl: './editprofile.component.html',
  styleUrls: ['./editprofile.component.scss']
})
export class EditprofileComponent implements OnInit {
  userForm: FormGroup;
  user: User;
  skills;
  avatar;
  loading = true;  

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private location: Location,
    public dialog: MatDialog,
    private sanitizer:DomSanitizer,
    private auth: AuthenticationService,
    private userService: UserService,
    private snackBar: MatSnackBar,
    ) {}

  ngOnInit() {
    const id = +this.route.snapshot.paramMap.get('id');
    if( !this.auth.loggedIn )
      this.router.navigate(['/login']);    
    if( id != this.auth.getUser() )
      this.router.navigate([`/user/${id}`]);

    this.userService.getAllSkills().pipe().subscribe( res => { this.skills = res; } )
    this.userService.getById(+this.route.snapshot.paramMap.get('id'))
    .pipe()
    .subscribe(
      res => {
        this.user   = res;      
        
        this.avatar = res.avatar.url ? res.avatar.url : null;
        this.avatar = this.avatar ? this.avatar : res.picture;
        this.avatar = this.avatar ? this.avatar : 'assets/img/avatar.png';

        this.userForm = new FormGroup({
          name: new FormControl( res.name, [Validators.required] ),
          email: new FormControl( res.email, [Validators.required, Validators.email] ),
          phone: new FormControl( res.phone ),
          address: new FormControl( res.address ),
          tagline: new FormControl( res.tagline, [Validators.required] ),
          description: new FormControl( res.description ),
          skills: new FormControl( res.skills.replace(/\s|\[|\]|"/g, '').split(',') )
        });

        this.loading  = false;        

      })
  }  

  openDialog() {
    const dialogRef = this.dialog.open(AvatarEditDialog, {
      width: '400px',
      height: 'auto',
      data: {
        imageUrl: this.avatar  
      }
    });

    dialogRef.afterClosed().subscribe(
      data => {
        if(data)
          this.avatar = data;
      } 
      );
  }

  transform(url) {
    return this.sanitizer.bypassSecurityTrustUrl(url);
  }

  updateProfile() {
    let userData = this.userForm.value;
    userData.avatar = this.avatar.changingThisBreaksApplicationSecurity;
    userData.id = this.user.id;
    this.userService.update(userData)
    .subscribe(
      res => {
        this.snackBar.open(res.message, 'OK', {
          verticalPosition: 'top',
          horizontalPosition: 'right'
        });
      }
      )
  }
}

@Component({
  selector: 'avatar-edit-dialog',
  templateUrl: 'avatar-edit-dialog.html',
})

export class AvatarEditDialog {
  @ViewChild('angularCropper') public angularCropper: CropperComponent;
  config   = { 
    aspectRatio: 1,
    movable: true,
    checkCrossOrigin: false,
    crop: this.onCrop.bind(this)
  };
  previewUrl: any;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private dialogRef: MatDialogRef<AvatarEditDialog>,
    private sanitizer:DomSanitizer
    ) {
    this.previewUrl = this.data.imageUrl;
  }  

  onCrop(e) {
    var croppedCanvas = this.angularCropper.cropper.getCroppedCanvas();
    var roundedCanvas = this.getRoundedCanvas(croppedCanvas);
    this.previewUrl   = this.transform(roundedCanvas.toDataURL());
  }

  onFileSelected(e) {
    var newFile = e.target.files[0];
    this.angularCropper.cropper.destroy();
    this.data.imageUrl = this.transform(URL.createObjectURL(newFile));
  }

  save() {
    this.dialogRef.close(this.previewUrl);
  }

  getRoundedCanvas(sourceCanvas) {
    var canvas = document.createElement('canvas');
    var context = canvas.getContext('2d');
    var width = sourceCanvas.width;
    var height = sourceCanvas.height;

    canvas.width = width;
    canvas.height = height;
    context.imageSmoothingEnabled = true;
    context.drawImage(sourceCanvas, 0, 0, width, height);
    context.globalCompositeOperation = 'destination-in';
    context.beginPath();
    context.arc(width / 2, height / 2, Math.min(width, height) / 2, 0, 2 * Math.PI, true);
    context.fill();
    return canvas;
  }

  transform(url) {
    return this.sanitizer.bypassSecurityTrustUrl(url);
  }
}
