import { Component, OnInit } from '@angular/core';
import { TaskService } from '../../service/task.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-task',
  templateUrl: './list-task.component.html',
  styleUrls: ['./list-task.component.css']
})
export class ListTaskComponent implements OnInit {

  tasks = []

  constructor(private taskService: TaskService,
    private snackBar: MatSnackBar,
    private router: Router) { }

  ngOnInit(): void {
    this.taskService.getTasks()
    .subscribe(
      res => { 
        this.tasks = res 
      },
      err => {
        if(err instanceof HttpErrorResponse) {
          if(err.status === 401 || err.status === 500) {
            this.snackBar.open("No estas logeado", null, {duration: 2000})
            this.router.navigate(["/login"])
          }
        }
        console.log(err)
      }
    )
  }

  changeStatus(selectTask, status) {
    const temporalStatus = selectTask.status

    selectTask.status = status;

    this.taskService.editTask(selectTask)
      .subscribe(
        res => { selectTask.status = status },
        err => { 
          console.log(err)
          selectTask.status = temporalStatus
          if(err instanceof HttpErrorResponse) {
            if(err.status === 401 || err.status === 500) {
              this.snackBar.open("No estas logeado", null, {duration: 2000})
              this.router.navigate(["/login"])
            }
          }
        }
        
      )
  }

  delete(task) {
    this.taskService.deleteTask(task)
      .subscribe(
        res => {
          const index = this.tasks.indexOf(task)
          if(index > -1) {
            this.tasks.splice(index, 1)
            this.snackBar.open("Tarea eliminada con éxito", null, { 
              duration:2000
            })
          }
        },
        err =>  {
          if(err instanceof HttpErrorResponse) {
            if(err.status === 401 || err.status === 500) {
              this.snackBar.open("No estas logeado", null, {duration: 2000})
              this.router.navigate(["/login"])
            }
          }
          console.log(err)
        }
      )
  }
}
