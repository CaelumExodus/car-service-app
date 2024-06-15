import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-table-wrapper',
  template: `
		<div class="overflow-x-auto">
			<table class="min-w-full bg-white rounded-lg overflow-hidden">
				<thead class="bg-gray-200 text-gray-700 uppercase text-sm leading-normal">
				<ng-content select="[table-header]"></ng-content>
				</thead>
				<tbody class="text-gray-600 text-sm font-light">
				<ng-container *ngIf="loading; else tableContent">
					<tr>
						<td colspan="5" class="py-10 px-6 text-center">
							<div class="loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-12 w-12 mb-4 inline-block"></div>
						</td>
					</tr>
				</ng-container>
				<ng-template #tableContent>
					<ng-content select="[table-body]"></ng-content>
				</ng-template>
				</tbody>
			</table>
		</div>
  `,
  styles: [`
    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }

    .loader {
      border-top-color: #3498db;
      animation: spin 1.5s linear infinite;
    }
  `]
})
export class TableWrapperComponent {
  @Input() loading: boolean = false;
}
