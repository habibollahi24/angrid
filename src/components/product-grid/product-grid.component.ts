import { Component, OnInit, signal, effect, inject } from '@angular/core';

import { DxDataGridModule } from 'devextreme-angular/ui/data-grid';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductsService } from '../../service/products.service';

interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  brand: string;
  category: string;
  thumbnail: string;
  shippingInformation: string;
}

@Component({
  selector: 'app-product-grid',
  imports: [CommonModule, DxDataGridModule, FormsModule],
  template: `
    <div class="" id="show-table">
      <div class="flex gap-4 mb-4">
        <!-- سرچ سریع -->
        <div>
          <label class="block mb-1">سرچ سریع</label>
          <input
            type="text"
            class="border rounded px-2 py-1 w-64"
            placeholder="Search..."
            (input)="onQuickSearch($any($event.target).value)"
          />
        </div>

        <!-- سرچ با کلیک -->
        <div>
          <label class="block mb-1">سرچ با کلیک</label>
          <div class="flex gap-2">
            <input
              type="text"
              class="border rounded px-2 py-1 w-64"
              placeholder="Search..."
              [(ngModel)]="manualSearchText"
            />
            <button
              (click)="onManualSearch()"
              class="bg-blue-600 text-white px-4 py-1 rounded"
            >
              سرچ
            </button>
          </div>
        </div>
      </div>

      <dx-data-grid
        [dataSource]="products()"
        [showBorders]="true"
        [columnAutoWidth]="true"
        [height]=""
        [showBorders]="true"
        [scrolling]="{ mode: 'virtual' }"
        [paging]="{ enabled: false }"
      >
        <dxo-sorting mode="multiple"></dxo-sorting>
        <dxi-column dataField="id" caption="ID" [width]="60"></dxi-column>
        <dxi-column
          dataField="title"
          caption="Title"
          [width]="250"
        ></dxi-column>
        <dxi-column
          dataField="price"
          caption="Price"
          [width]="100"
        ></dxi-column>
        <dxi-column dataField="shippingInformation" caption="Shipp Now">
        </dxi-column>

        <dxi-column
          dataField="category"
          caption="Category"
          [width]="250"
        ></dxi-column>
      </dx-data-grid>
    </div>
  `,
})
export class ProductGridComponent implements OnInit {
  private productService = inject(ProductsService);
  products = signal<Product[]>([]);
  searchText = signal('');
  manualSearchText = '';

  constructor() {
    this.searchTextEffect();
    this.fetchProducts();
  }

  fetchProducts(query = '') {
    this.productService.fetch(query).then((data) => {
      this.products.set(data);
    });
  }

  searchTextEffect() {
    effect(() => {
      const term = this.searchText();
      clearTimeout((window as any).searchTimeout);
      (window as any).searchTimeout = setTimeout(() => {
        this.fetchProducts(term);
      }, 500);
    });
  }

  onQuickSearch(value: string) {
    this.searchText.set(value);
  }

  onManualSearch() {
    this.fetchProducts(this.manualSearchText);
  }

  ngOnInit() {}
}
