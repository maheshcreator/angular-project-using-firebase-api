import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private router:Router,private http:HttpClient ) { }

  isAuthenticated():boolean{
    if(sessionStorage.getItem('token')!==null)
    {
       return true;
    }
       return false;
  }
  canAccess()
  {
    if(!this.isAuthenticated())
    {
      //redirect to login
      this.router.navigate(['/login'])
    }
  }
  canathenticate()
  {
    if(this.isAuthenticated())
    {
      //redirect to login
      this.router.navigate(['/dashboard'])
    }
  }
  register(name:String,email:String,password:string )
  {
 //send data to register api(firebase)
  return this.http.post<{idToken:string}>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAcuwkiyQJBwaWSJ3BkYFetO_wPAh8FeVk',
             {displayName:name,email:email,password:password} );
  }
  storeToken(token:string)
  {
    sessionStorage.setItem('token',token)
  }
  login(email:string,password:string)
  {
   //send data to login api(firebase)
    
   return this.http.post<{idToken:string}>("https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAcuwkiyQJBwaWSJ3BkYFetO_wPAh8FeVk",
                  {email:email,password:password}
   );
  }
  removeToken()
  {
    sessionStorage.removeItem('token')
  }
}
