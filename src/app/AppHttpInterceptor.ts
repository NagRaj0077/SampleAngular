import { HttpInterceptor, HttpHandler, HttpRequest, HttpEvent, HttpResponse, HttpErrorResponse }   from '@angular/common/http';
import { Injectable } from "@angular/core"
import { Observable, of } from "rxjs";
import { tap, catchError } from "rxjs/operators";
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerModule,NgxSpinnerService } from 'ngx-spinner';
@Injectable()
export class AppHttpInterceptor implements HttpInterceptor {
    constructor(public toasterService: ToastrService,private spinner: NgxSpinnerService) {}
intercept(
        req: HttpRequest<any>,
        next: HttpHandler
      ): Observable<HttpEvent<any>> {
    if(req){
         this.spinner.show();
    }
        return next.handle(req).pipe(
            tap(evt => {
                if (evt instanceof HttpResponse) {
                    if(evt.body ){
                         this.spinner.hide();
                        this.toasterService.success("Data Loaded", "Success", { positionClass: 'toast-bottom-right' });
                    }
                }
            }),
            catchError((err: any) => {
                if(err instanceof HttpErrorResponse) {
                    try {
                        this.spinner.hide();
                        this.toasterService.error("Data Loaded", "Success", { positionClass: 'toast-bottom-right' });
                    } catch(e) {
                        this.spinner.hide();
                        this.toasterService.error('An error occured', '', { positionClass: 'toast-bottom-right' });
                    }
                    //log error 
                }
                 this.spinner.hide();
                return of(err);
            }));
    
      }
      
}