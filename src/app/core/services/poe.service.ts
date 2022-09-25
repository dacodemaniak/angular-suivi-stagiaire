import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, of, take } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Logger } from '../helpers/logger';
import { ICrud } from '../interfaces/i-crud';
import { ModelFactory } from '../models/factory/model-factory';
import { POE } from '../models/poe';
import { ManagedService } from './managed-service';

@Injectable({
  providedIn: 'root'
})
export class POEService extends ManagedService implements ICrud<POE>{

  constructor(
    private httpClient: HttpClient
  ) {
    super();
  }

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
          return new ModelFactory().getInstance(this.entityClassName).deserialize(poe);
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
