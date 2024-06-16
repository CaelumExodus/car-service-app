import { Component } from '@angular/core';
import { Complaint } from "../../../../../Models/Models";
import { HttpClient } from "@angular/common/http";
import { finalize } from "rxjs";

@Component({
  selector: 'app-admin-complaints',
  templateUrl: './admin-complaints.component.html',
  styleUrl: './admin-complaints.component.scss'
})
export class AdminComplaintsComponent {

  public isLoading: boolean = false
  public complaints: Complaint[] = [];

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.fetchComplaints();
  }

  fetchComplaints(): void {
    this.isLoading = true

    this.http.get<Complaint[]>('http://localhost:3000/complaints')
      .pipe(finalize((): boolean => this.isLoading = false))
      .subscribe(
        (complaints: Complaint[]): void => {
          this.complaints = complaints;
        },
        error => {
          console.error('Error fetching complaints:', error);
        }
      );
  }
}
