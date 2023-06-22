import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpStatusCode } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { CustomToasterService } from '../../services/toaster.service';
import { ToasterPosition } from '../types/toaster-position';
import { AuthService } from '../../services/auth.service';



@Injectable()
export class HandleErrorInterceptor implements HttpInterceptor {
  constructor(private customToasterService: CustomToasterService, private authService: AuthService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      tap(
        // eslint-disable-next-line @typescript-eslint/no-empty-function
        () => {},
        (error) => {
          if (error.status === HttpStatusCode.BadRequest && Array.isArray(error.error.errors)) {
            this.customToasterService.showErrorToaster(ToasterPosition.topFullWidth, error.error.errors[0].message);
          }

          if (error.status === HttpStatusCode.Unauthorized) {
            this.authService.signOut();
          }
        }
      ),
    );
  }
}
