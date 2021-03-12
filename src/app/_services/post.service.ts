import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Post } from '@/_model';

@Injectable({ providedIn: 'root' })
export class PostService {
    constructor(private http: HttpClient) { }

    getById(id: number) {
        return this.http.get<Post>(`${environment.apiUrl}/posts/${id}`);
    }

    create(post) {
        return this.http.post<any>(`${environment.apiUrl}/posts`, post);
    }

    update(post) {
        return this.http.put<any>(`${environment.apiUrl}/posts/${post.id}`, post);
    }

    delete(id: number) {
        return this.http.delete<any>(`${environment.apiUrl}/posts/${id}`);
    }
}