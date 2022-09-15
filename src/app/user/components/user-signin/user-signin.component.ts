import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Logger } from 'src/app/core/helpers/logger';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-user-signin',
  templateUrl: './user-signin.component.html',
  styleUrls: ['./user-signin.component.scss']
})
export class UserSigninComponent implements OnInit {

  public signinForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.signinForm = this.formBuilder.group({
      login: [
        '', // Default value of login : ''
        Validators.required
      ],
      pass: [
        '',
        Validators.required
      ]
    });
  }

  public onSubmit(): void {
    this.userService.signin(this.signinForm.value); // Trigger the signin process
    
    if (this.userService.isAuthenticated()) {
      Logger.info(`Got a user!`)
    } else {
      Logger.info('Bad credentials');
    }
  }
}
