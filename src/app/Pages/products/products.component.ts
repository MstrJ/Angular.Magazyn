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
  searchText: string = localStorage.getItem('SearchBarValue')!;
  page: number = 1;
  Sortowanie: string = localStorage.getItem('Sortowanie')!;
  Wartosc: string = localStorage.getItem('Wartosc')!;

  ngOnInit(): void {
    this.getProducts();

    if (localStorage.getItem('Sortowanie') != this.Sortowanie)
      localStorage.setItem('Sortowanie', 'down');
    if (localStorage.getItem('Wartosc') != this.Wartosc)
      localStorage.setItem('Wartosc', 'kod');
    if (localStorage.getItem('SearchBarValue') != this.searchText)
      localStorage.setItem('SearchBarValue', '');
  }

  onChangeSort(): void {
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
    localStorage.setItem('Sortowanie', this.Sortowanie);
    localStorage.setItem('Wartosc', this.Wartosc);
    localStorage.setItem('SearchBarValue', this.searchText);

    this._productService.getProducts(this.searchText).subscribe((dane) => {
      this.products = this._productService.getSorted(
        dane,
        this.Sortowanie,
        this.Wartosc
      );
    });
  }
}
