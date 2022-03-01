import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Mentor } from '../models/mentor';

@Injectable({ providedIn: 'root' })
export class MentorService {
  httpHeaders: HttpHeaders;
  constructor(private httpClient: HttpClient) {
      this.httpHeaders = new HttpHeaders({ 'content-type': 'application/json' });
  }

  GetMentors(): Observable<HttpResponse<Mentor[]>> {
    return this.httpClient.get<Mentor[]>(environment.apiAddress + 'mentor/getall', { headers: this.httpHeaders, observe: 'response' });
  }
  GetMentor(id: number): Observable<HttpResponse<Mentor>> {
    return this.httpClient.get<Mentor>(environment.apiAddress + 'mentor/get/' + id, { headers: this.httpHeaders, observe: 'response' });
  }

}
