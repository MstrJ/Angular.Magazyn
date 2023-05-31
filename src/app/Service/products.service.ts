import { Injectable } from '@angular/core';
import { IProduct } from '../IProduct';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  dane: Observable<IProduct[]>;

  constructor(private client: HttpClient) {
    this.dane = this.getJsonProducts();
  }

  public getJsonProducts(): Observable<IProduct[]> {
    return this.client
      .get<IProduct[]>('https://localhost:7119/api/Produkty')
      .pipe(map((response) => response));
  }

  public getProducts(filter: string | undefined): Observable<IProduct[]> {
    let tempDane: Observable<IProduct[]> = this.dane;

    if (!filter || filter === '') return tempDane;

    let filterByName = tempDane.pipe(
      map((dane) =>
        dane.filter((x) => x.nazwa.toLowerCase().includes(filter.toLowerCase()))
      )
    );

    let filterBySector = tempDane.pipe(
      map((dane) =>
        dane.filter((x) =>
          x.sektor.toLowerCase().includes(filter.toLowerCase())
        )
      )
    );

    let filterByKod = tempDane.pipe(
      map((dane) =>
        dane.filter((x) => x.kod.toLowerCase().includes(filter.toLowerCase()))
      )
    );

    return filterByName;
  }

  public getSorted(
    dane: IProduct[],
    sortDirection: string,
    sortBy: string
  ): IProduct[] {
    if (sortBy === 'kod') {
      dane = dane.sort((a, b) => a.kod.localeCompare(b.kod));
    } else {
      dane = dane.sort((a, b) => a.ilosc - b.ilosc);
    }
    if (sortDirection === 'down') {
      dane.reverse();
    }

    return dane;
  }

  public getProduct(inputKod: string): Observable<IProduct | undefined> {
    return this.dane.pipe(map((dane) => dane.find((x) => x.kod === inputKod)));
  }
}
