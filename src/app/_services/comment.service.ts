import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Comment } from '@/_model';

@Injectable({ providedIn: 'root' })
export class CommentService {
    constructor(private http: HttpClient) { }

    getById(postId, id) {
        return this.http.get<Comment>(`${environment.apiUrl}/posts/${postId}/comments/${id}`);
    }

    create(postId, comment) {
        return this.http.post<any>(`${environment.apiUrl}/posts/${postId}/comments`, comment);
    }

    update(postId, comment) {
        return this.http.put<any>(`${environment.apiUrl}/posts/${postId}/comments/${comment.id}`, comment);
    }

    delete(postId, id) {
        return this.http.delete<any>(`${environment.apiUrl}/posts/${postId}/comments/${id}`);
    }
}