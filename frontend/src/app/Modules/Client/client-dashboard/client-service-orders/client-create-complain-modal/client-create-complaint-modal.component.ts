import { Component, EventEmitter, Input, Output } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { ServiceOrder } from "../../../../../Models/Models";
import { finalize } from "rxjs";
import { AuthService } from "../../../../../Auth/auth.service";

@Component({
  selector: 'app-client-create-complaint-modal',
  templateUrl: './client-create-complaint-modal.component.html',
  styleUrl: './client-create-complaint-modal.component.scss'
})
export class ClientCreateComplaintModalComponent {
  @Input() serviceOrderId: number = 0;

  @Output() closeModal = new EventEmitter<boolean>();

  complaint: ComplaintToSend = {
    orderid: 0,
    clientid: this.authService.getUserId()!,
    description: '',
    status: 'open',
  };

  constructor(private readonly http: HttpClient, private readonly authService: AuthService) {}

  public postComplaint(): void {
    this.complaint.orderid = this.serviceOrderId

    console.log(this.complaint)
    if (
      !this.complaint.orderid ||
      !this.complaint.clientid ||
      !this.complaint.description ||
      !this.complaint.status
    ) return;

    this.http.post<ServiceOrder>('http://localhost:3000/complaints', this.complaint)
      .pipe(finalize(() => this.closeModal.emit(true)))
      .subscribe(
        (): void => {},
        error => console.log('Error sending complaint', error)
      )
  }
}

interface ComplaintToSend {
  orderid: number,
  clientid: number,
  description: string,
  status: string,
}
