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
  public disableButtons: boolean = false;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.fetchServices();
  }


  getServicesNameFromDetailsToString(order: ServiceOrder): string | undefined {
    const serviceNameArray: string[] | undefined = order.services?.map((service: Service) => service.servicename)

    return serviceNameArray?.join(' | ');
  }

  public changeServiceOrderStatus(order: ServiceOrder, status: string): void {
    this.disableButtons = true;

    order.status = status

    this.http.put<ServiceOrder>(`http://localhost:3000/service-orders/${order.orderid}`, order)
      .pipe(finalize(() => {
        this.disableButtons = false
        this.fetchServices();
      }))
      .subscribe()
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
