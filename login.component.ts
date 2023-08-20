import { Component } from '@angular/core';
import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  formdata={email:"",password:""}
  submit=false;
  loading=false;
  errorMessage='';
 constructor(private auth:AuthService)
 {

 }
 
 onSubmit()
 {
   this.loading=true;
   //call login service
   this.auth.login(this.formdata.email,this.formdata.password)
   .subscribe(
    {
    next:data=>
    {
      //store token
      this.auth.storeToken(data.idToken);
      console.log("logged user token is "+data.idToken)
      this.auth.canathenticate();
    },
    error:data=>
    {
      if(data.error.error.message=='invalid_password'|| data.error.error.message=='invalid-id-email')
      {
        this.errorMessage="Invalid credentials";
      }
      else
      {
        this.errorMessage="unknown error when login into account"
      }
    }
   }).add(()=>
   {
    this.loading=false;
    console.log("login process completed")
   })
 }
 
}
