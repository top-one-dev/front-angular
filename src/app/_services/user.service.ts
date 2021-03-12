import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { User } from '@/_model';

@Injectable({ providedIn: 'root' })
export class UserService {
    constructor(private http: HttpClient) { }

    getAll() {
        return this.http.get(`${environment.apiUrl}/users`);
    }

    getById(id: number) {
        return this.http.get<User>(`${environment.apiUrl}/user/${id}`);
    }

    register(user) {
        return this.http.post<any>(`${environment.apiUrl}/signup`, user);
    }

    update(user) {
        return this.http.put<any>(`${environment.apiUrl}/user/${user.id}`, user);
    }

    delete(id: number) {
        return this.http.delete<any>(`${environment.apiUrl}/user/${id}`);
    }

    feed(){
        return this.http.get(`${environment.apiUrl}/posts`);
    }

    getAllSkills() {
        return this.http.get(`${environment.apiUrl}/skills`);
    }

    follow(userId){
        return this.http.post(`${environment.apiUrl}/relationships`, { id: userId });
    }

    unfollow(userId){
        return this.http.delete(`${environment.apiUrl}/relationships/${userId}`);
    }
}