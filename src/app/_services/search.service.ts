import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class SearchService {
    constructor(private http: HttpClient) { }

    search(query){
        return this.http.post<any>(`${environment.apiUrl}/search`, query);
    }
}