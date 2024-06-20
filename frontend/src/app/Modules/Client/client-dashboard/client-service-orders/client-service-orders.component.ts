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
    this.fetchServices();
  }

  openAddModal(): void {
    this.showAddModal = true;
  }

  closeAddModal(submitted: boolean): void {
    this.showAddModal = false;

    submitted && this.fetchServices()
  }

  getServicesNameFromDetailsToString(order: ServiceOrder): string | undefined {
    const serviceNameArray: string[] | undefined = order.services?.map((service: Service) => service.servicename)

    return serviceNameArray?.join(' | ');
  }

  getServiceOrderInvoice(order: ServiceOrder): void {

    this.http.get(`http://localhost:3000/invoices/${order.orderid}`, {
      responseType: 'blob'
    })
      .subscribe((blob: Blob): void => {
        const url: string = window.URL.createObjectURL(blob);

        const a: HTMLAnchorElement = document.createElement('a');
        a.href = url;
        a.download = `invoice_${order.orderid}.pdf`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
      }, error => {
        console.error('Error downloading invoice:', error);
      });
  }

  fetchServices(): void {
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
