import { Component } from '@angular/core';
import { IProduct } from 'src/app/IProduct';
import { ProductsService } from 'src/app/Service/products.service';
@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent {
  constructor(private _productService: ProductsService) {}
  products: IProduct[] = [];
  searchText: string | undefined;
  page: number = 1;
  ngOnInit(): void {
    this.getProducts();
  }

  onChangePage(event: any) {
    this.page = event;
    this.getProducts();
  }

  onSearching() {
    this.page = 1;
    this.getProducts();
  }

  getProducts(): void {
    this.products = this._productService.getProducts(this.searchText);
  }
}
