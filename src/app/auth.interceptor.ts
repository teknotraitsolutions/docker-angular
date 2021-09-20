import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {environment} from '../environments/environment';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {finalize} from 'rxjs/operators';


@Injectable()
export class CustomHttpInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    let token = '';
    if(!token){
        token = localStorage.getItem("token");
    }
    let url = environment.API_URL;
    url += req.url;

    req = req.clone({
     headers: req.headers.set('Authorization', 'Bearer ' + token) , url:url
    });

    return next.handle(req)
      .pipe(
        // get the url used
        finalize(() => {
          const urls = `${req.method} "${req.urlWithParams}"`;
          //console.log(urls);
        })
        );
  }
}