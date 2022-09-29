import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Logger } from 'src/app/core/helpers/logger';
import { POE } from 'src/app/core/models/poe';

@Component({
  selector: 'app-intern-toolbar',
  templateUrl: './intern-toolbar.component.html',
  styleUrls: ['./intern-toolbar.component.scss']
})
export class InternToolbarComponent implements OnInit {

  @Output() poeEmitter: EventEmitter<POE> = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  public receivePOE(poe: POE): void {
    Logger.info(`Parent receive : ${JSON.stringify(poe)}`);
    this.poeEmitter.emit(poe);
  }
}
