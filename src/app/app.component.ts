import { Component } from '@angular/core';
import { ProductsService } from './Service/products.service';
import { IProduct } from './IProduct';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'MagazynProject';
}
