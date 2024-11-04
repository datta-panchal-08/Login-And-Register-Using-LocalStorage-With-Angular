import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginFrm!:FormGroup;
  isLogin:boolean = true;
  constructor(private fb:FormBuilder, private router:Router) { }
 
  ngOnInit(): void {
    this.loginFrm = this.fb.group({
      email:['',[Validators.required,Validators.email]],
      password:['',Validators.required],
      userName:['',Validators.required]
    })
  }

  onSubmit(){
   const isLocalData  = localStorage.getItem('angular14');
   const formData = this.loginFrm.value;
  if(isLocalData != null){
      const localArray = JSON.parse(isLocalData); 
      localArray.push(formData);
      localStorage.setItem('angular14',JSON.stringify(localArray));
  }else{
    const localArray = [];
    localArray.push(formData);
    localStorage.setItem('angular14',JSON.stringify(localArray));
  }
  }

  onLogin(){
    const isLocalData  = localStorage.getItem('angular14'); 
    if(isLocalData != null){
      const users = JSON.parse(isLocalData);

      const isUserFound = users.find((m:any) => m.email === this.loginFrm.value.email && m.password === this.loginFrm.value.password);

      if(isUserFound != undefined){
        this.router.navigate(['/dashboard']);
      }else{
        alert("Username or Password is wrong!")
      }
    }else{
      alert("No User Found");
    }
  }

}
