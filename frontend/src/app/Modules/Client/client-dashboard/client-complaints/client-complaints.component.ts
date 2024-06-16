import { Component } from '@angular/core';
import { Complaint } from "../../../../Models/Models";
import { HttpClient } from "@angular/common/http";
import { finalize } from "rxjs";
import { AuthService } from "../../../../Auth/auth.service";

@Component({
  selector: 'app-client-complaints',
  templateUrl: './client-complaints.component.html',
  styleUrl: './client-complaints.component.scss'
})
export class ClientComplaintsComponent {

  public isLoading: boolean = false
  public complaints: Complaint[] = [];

  constructor(private http: HttpClient, private readonly authService: AuthService) { }

  ngOnInit(): void {
    this.fetchComplaints();
  }

  fetchComplaints(): void {
    const userId = this.authService.getUserId();

    if (!userId) return;

    this.isLoading = true;

    this.http.get<Complaint[]>(`http://localhost:3000/complaints/${userId}`)
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
