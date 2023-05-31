import { Injectable } from '@angular/core';
import dane from '../../assets/dane.json';
import { IProduct } from '../IProduct';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  public getProducts(filter: string | undefined): IProduct[] {
    let tempDane: IProduct[] = dane as IProduct[];

    if (filter == undefined || filter == '') return tempDane;

    let filterByName = tempDane.filter((x) =>
      x.nazwa.toLowerCase().match(filter?.toLocaleLowerCase()!)
    );
    let filterBySector = tempDane.filter((x) =>
      x.sektor.toLowerCase().includes(filter)
    );

    let filterByKod = tempDane.filter((x) =>
      x.kod.toLowerCase().includes(filter.toLowerCase())
    );

    if (filterByName.length > 0) return filterByName;
    else if (filterByKod.length > 0) return filterByKod;
    else if (filterBySector.length > 0) return filterBySector;
    return filterBySector;
  }

  public getSorted(
    dane: IProduct[],
    sortDirection: string,
    sortBy: string
  ): IProduct[] {
    if (sortBy == 'kod') dane = dane.sort((a, b) => a.kod.localeCompare(b.kod));
    else dane = dane.sort((a, b) => a.ilosc - b.ilosc);
    if (sortDirection == 'down') dane.reverse();

    return dane;
  }

  public getProduct(inputKod: string): Observable<IProduct> {
    const product: IProduct = dane.find((x) => x.kod == inputKod) as IProduct;
    return of(product);
  }
}
