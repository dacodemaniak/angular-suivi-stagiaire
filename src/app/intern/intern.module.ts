import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InternRoutingModule } from './intern-routing.module';
import { InternDetailComponent } from './components/intern-detail/intern-detail.component';
import { InternTableComponent } from './components/intern-table/intern-table.component';
import { InternAddComponent } from './components/intern-add/intern-add.component';
import { SharedModule } from '../shared/shared.module';
import { InternToolbarComponent } from './components/intern-toolbar/intern-toolbar.component';
import { PoesListComponent } from './components/intern-toolbar/poes-list/poes-list.component';
import { NameOrEmailSearchComponent } from './components/intern-toolbar/name-or-email-search/name-or-email-search.component';


@NgModule({
  declarations: [
    InternDetailComponent,
    InternTableComponent,
    InternAddComponent,
    InternToolbarComponent,
    PoesListComponent,
    NameOrEmailSearchComponent
  ],
  imports: [
    CommonModule,
    InternRoutingModule,
    SharedModule
  ]
})
export class InternModule { }
