import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, of, take } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Logger } from '../helpers/logger';
import { ICrud } from '../interfaces/i-crud';
import { POE } from '../models/poe';

@Injectable({
  providedIn: 'root'
})
export class POEService implements ICrud<POE>{


  constructor(
    private httpClient: HttpClient
  ) {}

  add(item: POE): void {

  }

  update(item: POE): void {

  }
  delete(item: POE): void {

  }

  findAll(): Observable<POE[]> {
    return this.httpClient.get<any>(
      `${environment.apiRoot}poe`
    )
    .pipe(
      take(1),
      map((poes: any) => {
        return poes.map((poe: any) => {
          
          const asClass: POE = new POE().deserialize(poe);

          Logger.info(`Deserialized POE ${JSON.stringify(asClass)}`);
          return asClass;
        })
      })
    )
  }

  findOne(id: number): Observable<POE | null> {
    return of(null);
  }

  public getNextId(): number {
    return 0;
  }
}
