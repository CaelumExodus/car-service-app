import { Component, EventEmitter, Output } from '@angular/core';
import { ServiceOrder } from "../../../../../Models/Models";
import { HttpClient } from "@angular/common/http";
import { finalize } from "rxjs";

@Component({
  selector: 'app-warehouse-add-part-modal',
  templateUrl: './warehouse-add-part-modal.component.html',
  styleUrl: './warehouse-add-part-modal.component.scss'
})
export class WarehouseAddPartModalComponent {
  @Output() closeModal = new EventEmitter<boolean>();

  part: PartToSend = {
    partname: '',
    partcategory: '',
    quantityinstock: 0,
    unitprice: 0,
    supplier: ''
  };

  constructor(private readonly http: HttpClient) {}

  public postNewPart(): void {
    if (
      !this.part.partname ||
      !this.part.partcategory ||
      !this.part.quantityinstock ||
      !this.part.unitprice ||
      !this.part.supplier
    ) return;

    this.http.post<ServiceOrder>('http://localhost:3000/parts', this.part)
      .pipe(finalize(() => this.closeModal.emit(true)))
      .subscribe(
        (): void => {},
        error => console.log('Error fetching services', error)
      )
  }
}

interface PartToSend {
  partname: string,
  partcategory: string,
  quantityinstock: number,
  unitprice: number,
  supplier: string
}
