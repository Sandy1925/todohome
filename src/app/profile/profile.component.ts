import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Customer } from 'models';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {

  email!:string | null;
  profile!:Customer;

  constructor(private router: ActivatedRoute,private http:HttpClient){

  this.router.paramMap.subscribe((param:ParamMap)=>{
    this.email=param.get('email');
    console.log(this.email);
  })

  this.http.get<Customer>("http://localhost:8000/api/getByEmail/"+this.email).subscribe(data=>{
    this.profile=data;
    console.log(this.profile);
  })

}

}
