import {HttpErrorResponse, HttpEvent, HttpEventType, HttpHandlerFn, HttpRequest} from "@angular/common/http";
import {catchError, Observable, tap, throwError} from "rxjs";
import {inject} from "@angular/core";
import {Router} from "@angular/router";

export function reqLoggingInterceptor(req: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> {
  console.log(req.url);
  return next(req);
}


export function resLoggingInterceptor(req: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> {
  const router = inject(Router);


  return next(req).pipe(tap(event => {
    if (event.type === HttpEventType.Response) {
      console.log(req.url, 'returned a response with status', event.status);
    }
  }), catchError((err:HttpErrorResponse) => {
    // 检查是否是401错误
    if (err.status === 401) {
      // 跳转到登录页面
      router.navigate(['/login']);
    }
    return throwError(() => err);
    }
  ));
}
