import { Component, OnInit } from '@angular/core';
import { Service, ServiceOrder } from "../../../../Models/Models";
import { HttpClient } from "@angular/common/http";
import { finalize } from "rxjs";

@Component({
  selector: 'app-service-service-orders',
  templateUrl: './service-service-orders.component.html',
  styleUrl: './service-service-orders.component.scss'
})
export class ServiceServiceOrdersComponent implements OnInit{

  public isLoading: boolean = false
  public serviceOrders: ServiceOrder[] = [];

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.fetchServices();
  }


  getServicesNameFromDetailsToString(order: ServiceOrder): string | undefined {
    const serviceNameArray: string[] | undefined = order.services?.map((service: Service) => service.servicename)

    return serviceNameArray?.join(' | ');
  }

  fetchServices(): void {
    this.isLoading = true;

    this.http.get<ServiceOrder[]>(`http://localhost:3000/service-orders/with-services`)
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
