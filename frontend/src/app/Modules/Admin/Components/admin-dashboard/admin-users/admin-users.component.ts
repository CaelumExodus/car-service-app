import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from "../../../../../Models/Models";
import { finalize } from "rxjs";

@Component({
  selector: 'app-admin-users',
  templateUrl: './admin-users.component.html',
  styleUrls: ['./admin-users.component.scss']
})
export class AdminUsersComponent implements OnInit {

  public isLoading: boolean = false
  public users: User[] = [];

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.fetchUsers();
  }

  fetchUsers(): void {
    this.isLoading = true

    this.http.get<User[]>('http://localhost:3000/users')
      .pipe(finalize((): boolean => this.isLoading = false))
      .subscribe(
        (users: User[]): void => {
          this.users = users;
        },
        error => {
          console.error('Error fetching users:', error);
        }
      );
  }
}
