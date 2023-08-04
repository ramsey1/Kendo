import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  private url =
    'https://api.slingacademy.com/v1/sample-data/files/employees.json';

  constructor(private http: HttpClient) {}

  getPosts() {
    return this.http.get(this.url);
  }
}
