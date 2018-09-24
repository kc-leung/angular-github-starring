import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { RepoService } from '../data/repo.service';
import { Observable } from 'rxjs';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {       // this class is to auth my token everytime I make a HTTP request

  token = 'your personal token here!!!!';

  constructor(public auth: RepoService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    request = request.clone({
      setHeaders: {
        Authorization: `token ${this.token}`
      }
    });

    return next.handle(request);
  }
}
