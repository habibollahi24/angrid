import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  private controller: AbortController | null = null;

  async fetch(query = '') {
    if (this.controller) this.controller.abort();
    this.controller = new AbortController();

    const url = query
      ? `https://dummyjson.com/products/search?q=${query}`
      : `https://dummyjson.com/products?limit=200`;

    const res = await fetch(url, { signal: this.controller.signal });
    const json = await res.json();
    return json.products;
  }
}
