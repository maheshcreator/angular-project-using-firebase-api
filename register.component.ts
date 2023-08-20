import { Component } from '@angular/core';
import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

formdata={name:'',email:'',password:''}
submit=false;
errorMessage='';
loading=false;
constructor( private auth:AuthService)
{

}
onSubmit()
{
   console.log(this.formdata)
   this.loading=true;
   //call register service
   this.auth.register(this.formdata.name,this.formdata.email,this.formdata.password)
  .subscribe(
    {
      next:data=>
      {
        //store token from response data
        this.auth.storeToken(data.idToken);
        console.log('registered idtoken is '+data.idToken)
        this.auth.canathenticate();
      },
      error:data=>
      {
        if(data.error.error.message=='invaild to email')
        {
          this.errorMessage="invalid email"
        }
        else if(data.error.error.message="email-exists")
        {
           this.errorMessage="already email exists!"
        }
        else{
          this.errorMessage="unknown error"
        }
      }
    }
  ).add(()=>{
  
    this.loading=false;
  console.log('register completed')
  
})
}
}