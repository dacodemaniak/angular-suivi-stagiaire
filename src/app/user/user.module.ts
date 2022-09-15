import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserSigninComponent } from './components/user-signin/user-signin.component';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  declarations: [
    UserSigninComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ]
})
export class UserModule { }
