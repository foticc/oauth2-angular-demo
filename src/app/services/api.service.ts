import {Inject, Injectable} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {AuthService} from "./auth.service";

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient,private auth: AuthService) {}


  hello():Observable<any> {
   return this.http.get("/api/index/hello")
  }

  message():Observable<any> {
    let token = this.auth.accessToken();
    return this.http.get("/api/message",{
      headers: new HttpHeaders({"Authorization": token}),
      responseType:'text'
    })
  }

}
