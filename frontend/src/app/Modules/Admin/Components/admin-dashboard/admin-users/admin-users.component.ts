import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from "../../../../../Models/Models";
import { finalize } from "rxjs";
import cloneDeep from 'lodash/cloneDeep';

@Component({
  selector: 'app-admin-users',
  templateUrl: './admin-users.component.html',
  styleUrls: ['./admin-users.component.scss']
})
export class AdminUsersComponent implements OnInit {

  public isLoading: boolean = false;
  public disableIcons: boolean = false;
  public users: User[] = [];
  public selectedUser?: User;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.fetchUsers();
  }

  openEditModal(user: User): void {
    this.selectedUser = cloneDeep(user);
  }

  closeModal(dataChanged: boolean): void {
    this.selectedUser = undefined;
    if (dataChanged) {
      this.fetchUsers();
    }
  }

  deleteUser(id: number): void {
    if (this.disableIcons) return

    this.disableIcons = true


    this.http.delete(`http://localhost:3000/users/${id}`)
      .pipe(finalize(() => {
        this.fetchUsers();
        this.disableIcons = false
      }))
      .subscribe(
        () => {},
        error => console.error('Error deleting user:', error)
      );
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

  protected readonly open = open;
}
