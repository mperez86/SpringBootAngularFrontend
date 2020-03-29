import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-singup',
  templateUrl: './singup.component.html',
  styleUrls: ['./singup.component.css']
})
export class SingupComponent implements OnInit {

  signUpUser = {
    name: '',
    email: '',
    password: ''
  }

  constructor(private auth: AuthService,
    private router: Router) { }

  ngOnInit(): void {
  }

  signUp() {
  
    this.auth.signUpUser(this.signUpUser)
      .subscribe(
        res => {
          console.log(res)
          localStorage.setItem('token', res.jwtToken)
          this.router.navigate(['/tasks'])
        },
        err => console.log(err)
      )
  }

}
