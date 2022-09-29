import { Component, OnInit } from '@angular/core';
import { InternService } from './../../../core/services/intern.service';
import { Logger } from './../../../core/helpers/logger';
import { Intern } from './../../../core/models/intern';
import { POE } from 'src/app/core/models/poe';

@Component({
  selector: 'app-intern-table',
  templateUrl: './intern-table.component.html',
  styleUrls: ['./intern-table.component.scss']
})
export class InternTableComponent implements OnInit {
  private static sortOrder: number = 1;

  public interns: Intern[] = [];

  public bubbleConfig: any = {
    height: '3em',
    width: '3em',
    lineHeight: '3em',
    backgroundColor: 'rgba(200, 10, 127, .7)',
    borderRadius: '50%',
    fontWeight: 'bold',
    color: '#fff',
    verticalAlign: 'middle',
    textAlign: 'center'
  }

  constructor(
    public internService: InternService // Dependency Injection (D de SOLID)
  ) {
  }

  ngOnInit(): void {
    this.internService.findAll()
      .subscribe((interns: Intern[]) => {
        this.interns = interns;
      })
  }

  public onDelete(intern: Intern): void {
    this.internService.delete(intern);
  }

  public sortByName(): void {
    Logger.info(`Before sort, sortOrder is : ${InternTableComponent.sortOrder}`);
    this.interns.sort(
      InternTableComponent.sortName
    );
    InternTableComponent.sortOrder = InternTableComponent.sortOrder * -1;
    console.log(`After sort, sortOrder is : ${InternTableComponent.sortOrder}`);
  }

  public receivePOE(poe: POE): void {
    Logger.info(`Grand father receive ${JSON.stringify(poe)}`);
  }

  private static sortName(intern1: Intern, intern2: Intern): number {
    if (intern1.name > intern2.name) {
      return 1 * InternTableComponent.sortOrder;
    } else if (intern1.name < intern2.name) {
      return -1 * InternTableComponent.sortOrder;
    } else {
      return 0;
    }
  }
}
