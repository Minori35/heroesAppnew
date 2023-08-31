import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { enviroments } from 'src/enviroments/environments';
import { User } from '../interfaces/user.interface';
import { Observable , tap} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseURL = enviroments.baseUrl;
  private user?: User;

  constructor( private http: HttpClient ) { }

  get currentUSer(): User | undefined{
    if(!this.user) return undefined;
    return structuredClone(this.user);
  }

  login(email: string, password : string):Observable<User>{
   return this.http.get<User>(`${this.baseURL}/users/1`)
    .pipe(
      tap(user => this.user=user),
        tap(user => localStorage.setItem('token', '1ssdacd-d-asdcs99'))
      
    )
    

  }

  logout(){
    this.user= undefined;
    localStorage.clear();
  }
}
