import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Customer, Tasks } from 'models';

@Component({
  selector: 'app-pending',
  templateUrl: './pending.component.html',
  styleUrls: ['./pending.component.css']
})
export class PendingComponent {

  email!:string | null;
  profile!:Customer;
  tasks!:Tasks[];

  constructor(private router: ActivatedRoute,private http:HttpClient){
    this.router.paramMap.subscribe((param:ParamMap)=>{
      this.email=param.get('email');
      console.log(this.email);
    })

    this.http.get<Customer>("http://localhost:8000/api/getByEmail/"+this.email).subscribe(data=>{
      this.profile=data;
      console.log(this.profile);
    })

    this.http.get<Tasks[]>("http://localhost:8000/api/pending/"+this.email).subscribe(data=>{
      this.tasks=data;
      console.log(data);
    })


}

}
