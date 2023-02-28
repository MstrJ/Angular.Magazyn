import { Component, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IProduct } from '../IProduct';
import { Observable, of } from 'rxjs';
import { ProductsService } from '../Service/products.service';
import { Location } from '@angular/common';
@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css'],
})
export class ProductDetailComponent {
  product: IProduct | undefined;
  constructor(
    private route: ActivatedRoute,
    private _productService: ProductsService,
    private location: Location
  ) {}
  ngOnInit(): void {
    this.getProduct();
  }
  getProduct(): void {
    const kod = this.route.snapshot.paramMap.get('kod')!;
    this._productService.getProduct(kod).subscribe((x) => (this.product = x));
    console.log(this.product);
  }

  goBack(): void {
    this.location.back();
  }
}
