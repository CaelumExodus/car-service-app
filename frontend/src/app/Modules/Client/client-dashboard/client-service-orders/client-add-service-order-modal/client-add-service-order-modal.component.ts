import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Service, ServiceOrder } from "../../../../../Models/Models";
import { finalize } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { AuthService } from "../../../../../Auth/auth.service";

@Component({
  selector: 'app-client-add-service-order-modal',
  templateUrl: './client-add-service-order-modal.component.html',
  styleUrl: './client-add-service-order-modal.component.scss'
})
export class ClientAddServiceOrderModalComponent implements OnInit {
  @Output() closeModal = new EventEmitter<boolean>();


  protected services: Service[] = [];
  protected isLoading: boolean = false;
  protected selectedServices: Service[] = [];

  constructor(private readonly http: HttpClient, private readonly authService: AuthService) {}

  ngOnInit() {
    this._fetchServices();
  }

  onServiceClick(service: Service): void {
    const index: number = this.selectedServices.findIndex((s: Service): boolean => s.serviceid === service.serviceid);

    index > -1 ? this.selectedServices.splice(index, 1) : this.selectedServices.push(service);
  }

  public postNewServiceOrder(): void {
    let totalcost = 0;
    this.selectedServices.forEach((service: Service) => totalcost += Number(service.price) );

    const serviceorderdetails = this.selectedServices.map((service: Service) => {
      return {serviceId: service.serviceid}
    })

    this.http.post<ServiceOrder>('http://localhost:3000/service-orders', {
        clientid: this.authService.getUserId(),
        status: "pending",
        totalcost,
        serviceorderdetails
    })
      .pipe(finalize(() => this.closeModal.emit(true)))
      .subscribe(
        () => {},
        error => console.log('Error fetching services', error)
      )
  }

  private _fetchServices(): void {
    this.http.get<Service[]>(`http://localhost:3000/services`)
      .pipe(finalize((): boolean => this.isLoading = false))
      .subscribe(
        (services: Service[]): void => {
          this.services = services;
        },
        error => {
          console.log('Error fetching services', error);
        }
      )
  }
}
