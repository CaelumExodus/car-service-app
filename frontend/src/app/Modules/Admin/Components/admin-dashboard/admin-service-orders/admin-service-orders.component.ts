import { Component, OnInit } from '@angular/core';
import { ServiceOrder } from "../../../../../Models/Models";
import { HttpClient } from "@angular/common/http";
import { finalize } from "rxjs";

@Component({
  selector: 'app-admin-service-orders',
  templateUrl: './admin-service-orders.component.html',
  styleUrl: './admin-service-orders.component.scss'
})
export class AdminServiceOrdersComponent implements OnInit {

  public isLoading: boolean = false
  public serviceOrders: ServiceOrder[] = [];

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.fetchUsers();
  }

  fetchUsers(): void {
    this.isLoading = true

    this.http.get<ServiceOrder[]>('http://localhost:3000/service-orders')
      .pipe(finalize((): boolean => this.isLoading = false))
      .subscribe(
        (serviceOrders: ServiceOrder[]): void => {
          this.serviceOrders = serviceOrders;
        },
        error => {
          console.error('Error fetching users:', error);
        }
      );
  }
}
