import { Component, OnInit  } from '@angular/core';
import { Service, ServiceOrder } from "../../../../Models/Models";
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
  public showAddModal: boolean = false;

  constructor(private http: HttpClient, private readonly authService: AuthService) { }

  ngOnInit(): void {
    this.fetchUsers();
  }

  openAddModal(): void {
    this.showAddModal = true;
  }

  closeAddModal(submitted: boolean): void {
    this.showAddModal = false;

    submitted && this.fetchUsers()
  }

  getServicesNameFromDetailsToString(order: ServiceOrder): string | undefined {
    const serviceNameArray: string[] | undefined = order.services?.map((service: Service) => service.servicename)

    return serviceNameArray?.join(' | ');
  }

  fetchUsers(): void {
    const userId: number | undefined = this.authService.getUserId();

    if (!userId) return;

    this.isLoading = true;

    this.http.get<ServiceOrder[]>(`http://localhost:3000/service-orders/with-services/client/${userId}`)
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
