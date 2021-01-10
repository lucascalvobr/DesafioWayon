import { Component, OnInit } from '@angular/core';
import { Users } from '../users.model';
import { ProductService } from '../users.service';

@Component({
  selector: 'app-users-read',
  templateUrl: './users-read.component.html',
  styleUrls: ['./users-read.component.css']
})
export class UsersReadComponent implements OnInit {

  users!: Users[];
  displayedColumns = ['id', 'name', 'username', 'email']

  constructor(private userService: ProductService) { }

  ngOnInit(): void {
    this.userService.read().subscribe(users => {
      this.users = users
      console.log(users)
    })
  }

}
