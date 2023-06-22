import { Component } from '@angular/core';
import { FormBuilder, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LocalStorageService } from '../../services/localStorage.service';

@Component({
  selector: 'app-auth-page',
  templateUrl: './auth-page.component.html',
  styleUrls: ['./auth-page.component.scss']
})
export class AuthPageComponent {

  constructor(private fb:FormBuilder, private localStoreService:LocalStorageService, private router: Router) { }
  public registerForm=this.fb.group({
    email:[ '', [Validators.required, Validators.email]],
    password:[ '', [Validators.required]],


  });
 

  saveUser(){
    if(!this.registerForm.valid){
  
    }else{
      const { email, password } = this.registerForm.value;
      this.localStoreService.setDataLocalStorage("user", {email, password});
      this.router.navigate(['/', 'dashboard']);
    }

  }

  

}
