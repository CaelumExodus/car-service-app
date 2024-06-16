import { Component } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {finalize} from "rxjs";
import {Part} from "../../../../../Models/Models";

@Component({
  selector: 'app-admin-parts',
  templateUrl: './admin-parts.component.html',
  styleUrl: './admin-parts.component.scss'
})
export class AdminPartsComponent {

  public isLoading: boolean = false
  public parts: Part[] = [];

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.fetchParts();
  }

  fetchParts(): void {
    this.isLoading = true

    this.http.get<Part[]>('http://localhost:3000/parts')
      .pipe(finalize((): boolean => this.isLoading = false))
      .subscribe(
        (parts: Part[]): void => {
          this.parts = parts;
        },
        error => {
          console.error('Error fetching parts:', error);
        }
      );
  }
}
