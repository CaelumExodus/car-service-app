import { Component } from '@angular/core';
import { Service } from "../../../../../Models/Models";
import { HttpClient } from "@angular/common/http";
import { finalize } from "rxjs";

@Component({
  selector: 'app-admin-services',
  templateUrl: './admin-services.component.html',
  styleUrl: './admin-services.component.scss'
})
export class AdminServicesComponent {

  public isLoading: boolean = false
  public services: Service[] = [];

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.fetchServices();
  }

  fetchServices(): void {
    this.isLoading = true

    this.http.get<Service[]>('http://localhost:3000/services')
      .pipe(finalize((): boolean => this.isLoading = false))
      .subscribe(
        (services: Service[]): void => {
          this.services = services;
        },
        error => {
          console.error('Error fetching service:', error);
        }
      );
  }
}
