import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'avatarRender'
})
export class AvatarRenderPipe implements PipeTransform {

  transform(user: any, args?: any): any {
  	let avatar = null;
    avatar = user.avatar.url ? user.avatar.url : null;
    avatar = avatar ? avatar : user.picture;
    avatar = avatar ? avatar : 'assets/img/avatar.png';
    return avatar;
  }

}
