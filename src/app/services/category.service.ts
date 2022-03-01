import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Category } from '../models/category';

@Injectable({providedIn: 'root'})
export class CategoryService {
    httpHeaders: HttpHeaders;

    category:Category|any;
    constructor(private httpClient: HttpClient) {
        this.httpHeaders = new HttpHeaders({ 'content-type': 'application/json' });
    }
    
    GetCategories(): Observable<HttpResponse<Category[]>> {
        return this.httpClient.get<Category[]>(environment.apiAddress + 'category/getall', { headers: this.httpHeaders, observe: 'response' });
    }   
}