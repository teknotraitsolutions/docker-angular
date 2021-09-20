import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
    //users are authenticated only if the token is generated
    // var role = localStorage.getItem("role");
    // if (role != '2') {
    //   this.router.navigate(['/']);
    // }
  }

  logout(){
    localStorage.clear();
    this.router.navigate(['/']);
  }

}
