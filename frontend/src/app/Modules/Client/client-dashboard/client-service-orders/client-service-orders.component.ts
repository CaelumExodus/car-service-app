import { Component, OnInit } from '@angular/core';
import { ServiceOrder } from "../../../../Models/Models";
import { HttpClient } from "@angular/common/http";
import { finalize } from "rxjs";
import { AuthService } from "../../../../Auth/auth.service";

@Component({
  selector: 'app-client-service-orders',
  templateUrl: './client-service-orders.component.html',
  styleUrl: './client-service-orders.component.scss'
})
export class ClientServiceOrdersComponent implements OnInit {

  public isLoading: boolean = false
  public serviceOrders: ServiceOrder[] = [];

  constructor(private http: HttpClient, private readonly authService: AuthService) { }

  ngOnInit(): void {
    this.fetchUsers();
  }

  fetchUsers(): void {
    const userId: number | undefined = this.authService.getUserId();

    if (!userId) return;

    this.isLoading = true;

    this.http.get<ServiceOrder[]>(`http://localhost:3000/service-orders/${userId}`)
      .pipe(finalize((): boolean => this.isLoading = false))
      .subscribe(
        (serviceOrders: ServiceOrder[]): void => {
          this.serviceOrders = serviceOrders;
        },
        error => {
          console.error('Error fetching service orders:', error);
        }
      );
  }
}
