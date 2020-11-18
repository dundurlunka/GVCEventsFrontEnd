import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators'
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(private toastrService: ToastrService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(catchError(err => {
      if (err.status == 400 || err.status == 403)
        this.toastrService.error('Грешни данни');
      else if (err.status == 404)
        this.toastrService.error('Не съществува');

        const error = {
          message: err?.error?.message || err.statusText,
          status: err.status
        };

        return throwError(error);
    }))
  }
}
