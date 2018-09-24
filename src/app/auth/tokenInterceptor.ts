import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { RepoService } from '../data/repo.service';
import { Observable } from 'rxjs';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {       // this class is to auth my token everytime I make a HTTP request

  token = '56999d8c3fcbddddec80364a3e69fb15d41f820b';

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
