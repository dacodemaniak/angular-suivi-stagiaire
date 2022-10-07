import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { POEService } from '@services/poe.service';
import { Logger } from 'src/app/core/helpers/logger';
import { POE } from 'src/app/core/models/poe';
import { ToolbarServiceService } from 'src/app/intern/services/toolbar-service.service';

@Component({
  selector: 'app-poes-list',
  templateUrl: './poes-list.component.html',
  styleUrls: ['./poes-list.component.scss']
})
export class PoesListComponent implements OnInit {
  public poes: POE[] = [];
  @Output() public poeEmitter: EventEmitter<POE> = new EventEmitter();

  constructor(
    private poeService: POEService,
    private toolbarService: ToolbarServiceService
  ) { }

  ngOnInit(): void {
    this.poeService.findAll()
      .subscribe((poes: POE[]) => {
        this.poes = poes;
      });
  }

  public selectedPOE(poe: POE): void {
    Logger.info(`Child send ${JSON.stringify(poe)}`);
    this.poeEmitter.emit(poe); // With Output
    this.toolbarService.setPOE(poe); // With Observable
  }


}
