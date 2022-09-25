import { HttpClient, HttpResponse } from '@angular/common/http';
import { identifierName } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { take, map } from 'rxjs/operators';
import { Logger } from '../helpers/logger';
import { ICrud } from '../interfaces/i-crud';
import { ModelFactory } from '../models/factory/model-factory';
import { Intern } from '../models/intern';
import { environment } from './../../../environments/environment';
import { ManagedService } from './managed-service';
@Injectable({
  providedIn: 'root'
})
export class InternService extends ManagedService implements ICrud<Intern> {

  constructor(
    private httpClient: HttpClient
  ) {
    super();
  }

  findAll(): Observable<Intern[]> {
    return this.httpClient.get<any>(
      `${environment.apiRoot}intern`
    ).pipe(
      take(1),
      map((rawInterns: any) => {
        return rawInterns.map((rawIntern: any) => {
          return new ModelFactory().getInstance(this.entityClassName).deserialize(rawIntern);
        })
      })
    )
  }

  findOne(id: number): Observable<Intern | null> {
    return this.httpClient.get<any>(
      `${environment.apiRoot}intern/${id}`
    )
    .pipe(
      take(1),
      map((rawIntern: any) => {
        return new ModelFactory().getInstance(this.entityClassName).deserialize(rawIntern);
      })
    )
  }

  /**
   * Check if an email already exists in the database sending a request to our API
   * @param email The email we want to check
   * @returns an Observable of HttpResponse (containing status and eventually a body)
   */
  public emailAlreadyExists(email: string): Observable<HttpResponse<any>> {
    return this.httpClient.get<HttpResponse<any>>(
      `${environment.apiRoot}intern/byemail?email=${email}`,
      {
        observe: 'response'
      }
    );
  }

  public getItemNumber(): number {
    return 0;
  }

  public delete(intern: Intern): void {}

  /**
   * 
   * @param internData Combination of Intern and POEs typed unknown to avoid reassignation
   */
  public add(internData: unknown): Observable<Intern> {
    return this.httpClient.post<any>(
      `${environment.apiRoot}intern`,
      internData
    )
    .pipe(
      take(1),
      map((rawIntern: unknown) => {
        return new ModelFactory().getInstance(this.entityClassName).deserialize(rawIntern);
      })
    )
  }

  public update(intern: Intern): void {}

  public getNextId(): number {

    return 0;
  }
}
