import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Reply } from '@/_model';

@Injectable({ providedIn: 'root' })
export class ReplyService {
    constructor(private http: HttpClient) { }

    getById(postId, commentId, id) {
        return this.http.get<Reply>(`${environment.apiUrl}/posts/${postId}/comments/${commentId}/replies/${id}`);
    }

    create(postId, commentId, reply) {
        return this.http.post<any>(`${environment.apiUrl}/posts/${postId}/comments/${commentId}/replies`, reply);
    }

    update(postId, commentId, reply) {
        return this.http.put<any>(`${environment.apiUrl}/posts/${postId}/comments/${commentId}/replies/${reply.id}`, reply);
    }

    delete(postId, commentId, id) {
        return this.http.delete<any>(`${environment.apiUrl}/posts/${postId}/comments/${commentId}/replies/${id}`);
    }
}