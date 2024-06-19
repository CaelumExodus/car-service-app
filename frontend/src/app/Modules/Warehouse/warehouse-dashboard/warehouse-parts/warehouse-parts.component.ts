import { Component, OnInit } from '@angular/core';
import { Part } from "../../../../Models/Models";
import { HttpClient } from "@angular/common/http";
import { finalize } from "rxjs";

@Component({
  selector: 'app-warehouse-parts',
  templateUrl: './warehouse-parts.component.html',
  styleUrl: './warehouse-parts.component.scss'
})
export class WarehousePartsComponent implements OnInit{

  public isLoading: boolean = false
  public parts: Part[] = [];
  public showAddModal: boolean = false;


  constructor(private readonly http: HttpClient) { }

  ngOnInit(): void {
    this.fetchParts();
  }

  openAddModal(): void {
    this.showAddModal = true;
  }

  closeAddModal(submitted: boolean): void {
    this.showAddModal = false;

    submitted && this.fetchParts()
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

  changePartsQuantity(quantity: string, id: number, increment: boolean = true): void {
    if (!quantity) return;

    this.isLoading = true;

    this.http.post(`http://localhost:3000/parts/${increment ? 'add' : 'sub'}`, {
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
