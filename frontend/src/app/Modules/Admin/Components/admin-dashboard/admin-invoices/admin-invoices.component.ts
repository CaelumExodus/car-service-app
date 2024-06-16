import { Component } from '@angular/core';
import { Invoice } from "../../../../../Models/Models";
import { HttpClient } from "@angular/common/http";
import { finalize } from "rxjs";

@Component({
  selector: 'app-admin-invoices',
  templateUrl: './admin-invoices.component.html',
  styleUrl: './admin-invoices.component.scss'
})
export class AdminInvoicesComponent {

  public isLoading: boolean = false
  public invoices: Invoice[] = [];

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.fetchInvoices();
  }

  fetchInvoices(): void {
    this.isLoading = true

    this.http.get<Invoice[]>('http://localhost:3000/invoices')
      .pipe(finalize((): boolean => this.isLoading = false))
      .subscribe(
        (invoices: Invoice[]): void => {
          this.invoices = invoices;
        },
        error => {
          console.error('Error fetching invoices:', error);
        }
      );
  }
}
