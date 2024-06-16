import { Component, EventEmitter, Input, Output } from '@angular/core';
import { User } from "../../../../../../Models/Models";
import { HttpClient } from "@angular/common/http";
import { finalize } from "rxjs";

@Component({
  selector: 'app-admin-edit-user-modal',
  templateUrl: './admin-edit-user-modal.component.html',
  styleUrl: './admin-edit-user-modal.component.scss'
})
export class AdminEditUserModalComponent {
  @Input() user!: User;
  @Output() onClose = new EventEmitter<boolean>();

  constructor(private http: HttpClient) {}

  closeModal(dataChanged: boolean = false): void {
    this.onClose.emit(dataChanged);
  }

  onSubmit(): void {
    this.http.put(`http://localhost:3000/users/${this.user.userid}`, this.user)
      .pipe(finalize(() => this.closeModal(true)))
      .subscribe(
        (): void => {},
        error => console.error('Error updating user:', error)
      );
  }
}
