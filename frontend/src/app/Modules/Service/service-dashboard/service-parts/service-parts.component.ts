import { Component, OnInit } from '@angular/core';
import { Part } from "../../../../Models/Models";
import { HttpClient } from "@angular/common/http";
import { finalize } from "rxjs";

@Component({
  selector: 'app-service-parts',
  templateUrl: './service-parts.component.html',
  styleUrl: './service-parts.component.scss'
})
export class ServicePartsComponent implements OnInit {

  public isLoading: boolean = false
  public parts: Part[] = [];
  constructor(private readonly http: HttpClient) { }

  ngOnInit(): void {
    this.fetchParts();
  }

  fetchParts(): void {
    this.isLoading = true;

    this.http.get<Part[]>(`http://localhost:3000/parts`)
      .pipe(finalize((): boolean => this.isLoading = false))
      .subscribe(
        (parts: Part[]): void => {
          this.parts = parts;
        },
        error => {
          console.error('Error fetching service orders:', error);
        }
      );
  }

  decrementPartsQuantity(quantity: string, id: number): void {
    if (!quantity) return;

    this.isLoading = true;

    this.http.post(`http://localhost:3000/parts/sub`, {
      quantity,
      id
    })
      .pipe(finalize((): boolean => this.isLoading = false))
      .subscribe(
        (): void => {
          this.fetchParts();
        },
        error => {
          console.error('Error fetching service orders:', error);
        }
      )
  }
}
