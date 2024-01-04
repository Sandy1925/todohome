import { Component } from '@angular/core';
import { Customer, Tasks } from 'models';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  profile!:Customer;
  email!:string;
  tasks!:Tasks[];
  title = 'home';
  

  param!:string; 
  
  newTask=new Tasks();
  task!:any;
  checkers!:any;
  tasksChecked=new Array<Tasks>();

  constructor(private router: ActivatedRoute,private http:HttpClient){
    var cookies=document.cookie.split(';');
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
      console.log(this.profile);
      
      
    })

    this.http.get<Tasks[]>("http://localhost:8000/api/getAll/"+this.email).subscribe(data=>{
      this.tasks=data;
      console.log(this.tasks[0]);
    })

  }

  addTask(){
    this.task=prompt("Enter new Task")
   this.newTask.description=this.task;
   this.newTask.email=this.email;

   this.http.post<Tasks>("http://localhost:8000/api/newTask",this.newTask).subscribe(data=>{
     this.tasks.push(data);
     console.log(data);
   })
 }

 doneTasks(){
   this.getCheckers();
   for (let c of this.tasksChecked){
     c.status=1;
     console.log(c);
     this.http.post<Tasks>("http://localhost:8000/api/updateTask/"+c.id,c).subscribe(data=>{
       console.log(data);
     });
   }
   this.reloadPage();
  
   
 }

 getCheckers(){
   this.checkers=document.querySelectorAll("#checker");
   for (let c of this.checkers){
     if(c.checked==true){
       //console.log(typeof(Number(c.id)));
       this.getCheckedTasks(Number(c.value));
     }
   }
 }

 getCheckedTasks(id: number){
   for( let t of this.tasks){
     if(t.id == id){
       this.tasksChecked.push(t);
     }
   }

 }



 removeTask(){
   this.getCheckers();
   for(let t of this.tasksChecked){
     t.status=2;
     console.log(t);
     this.http.post<Tasks>("http://localhost:8000/api/updateTask/"+t.id,t).subscribe(data=>{
       console.log(data);
     });

   }
   this.reloadPage();
  
 }

 reloadPage(){
   window.location.reload();
 }


  

}
