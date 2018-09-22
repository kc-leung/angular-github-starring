import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs';

import { Repo } from './repo';
import { Starring } from './starring'

@Injectable({
  providedIn: 'root'
})
export class RepoService {

  private url = "https://api.github.com/"


  constructor(private http: HttpClient) { }

  getRepositories(name): Observable<Repo> {
    return this.http.get<Repo>(`${this.url}search/repositories?&sort=stars&order=desc&per_page=10&q=` + name);
  }

  getTags(url): Observable<any> {
    return this.http.get<any>(`${url}?per_page=1`);
  }

  getStarring(): Observable<Starring[]> {
    return this.http.get<Starring[]>(`${this.url}user/starred`);
  }

  saveStarring(star: Starring): Observable<any> {
    return this.http.put<any>(`${this.url}user/starred/` + star.full_name, star);
  }

  deleteStarring(star: any): Observable<any> {
    return this.http.delete<any>(`${this.url}user/starred/` + star.full_name, star);
  }

}
