import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UiModule } from '../ui/ui.module';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AgePipe } from './pipes/age.pipe';
import { InitialsDirective } from './directives/initials.directive';
import { InitialPipe } from './pipes/initial.pipe';
import { RouterModule } from '@angular/router';



@NgModule({
  imports: [
    UiModule,
    ReactiveFormsModule,
    RouterModule
  ],
  declarations: [
    HeaderComponent,
    FooterComponent,
    AgePipe,
    InitialsDirective,
    InitialPipe
  ],
  exports: [
    UiModule,
    ReactiveFormsModule,
    HeaderComponent,
    FooterComponent,
    HttpClientModule,
    AgePipe,
    InitialPipe,
    InitialsDirective
  ]
})
export class SharedModule { }
