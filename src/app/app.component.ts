import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { Customer, Tasks } from 'models';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'home';
  email!:string;
  profile!:Customer;
  param!:string; 
  tasks!:Tasks[];
  newTask=new Tasks();
  task!:any;
  checkers!:any;
  tasksChecked=new Array<Tasks>();

  constructor(private http:HttpClient){
    var cookies=document.cookie.split(';');
    //console.log(cookies);

    for(let i=0;i<cookies.length;i++){
      var data=cookies[i].split("=");
      //console.log(data);
      for (let j=0;j<data.length;j++){
        if(data[j]===" todoEmail"){
          console.log(data[j+1]);
          this.email=data[j+1];
        }
      }
    }

    this.http.get<Customer>("http://localhost:8000/api/getByEmail/"+this.email).subscribe(data=>{
      this.profile=data;
      this.param=this.email;
      
    })
    this.http.get<Tasks[]>("http://localhost:8000/api/getAll/"+this.email).subscribe(data=>{
      this.tasks=data;
      console.log(this.tasks[0]);
    })

  }
  ngOnInit(): void {
    
  }

  goHome(){
    window.location.href="http://localhost:4203/home"
  }

  
}
