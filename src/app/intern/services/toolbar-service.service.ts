import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { POE } from 'src/app/core/models/poe';

@Injectable({
  providedIn: 'root'
})
export class ToolbarServiceService {

  private poe$: Subject<POE> = new Subject();

  constructor() { }

  public getPOE(): Subject<POE> {
    return this.poe$;
  }

  public setPOE(poe: POE): void {
    this.poe$.next(poe);
  }
}
