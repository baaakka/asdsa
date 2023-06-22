import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'cake-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss'],
})
export class PaginationComponent {
  @Input() page!: number;

  @Output() pageChange = new EventEmitter<number>();

  @Input() pageSize!: number;

  @Input() count!: number;

  get getPages(): number {
    return Math.ceil(this.count/this.pageSize) || 1;
  }

  firstPage() {
    if (this.page !== 1) {
      this.pageChange.emit(1)
    }
  }

  lastPage() {
    if (this.getPages !== this.page) {
      this.pageChange.emit(this.getPages)
    }
  }

  nextPage() {
    if (this.getPages !== this.page) {
      this.pageChange.emit(this.page + 1)
    }
    
  }

  previousPage() {
    if (1 !== this.page) {
      this.pageChange.emit(this.page - 1)
    }
  }
}
