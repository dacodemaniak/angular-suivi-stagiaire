import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Logger } from 'src/app/core/helpers/logger';
import { CrudSnackbarService } from 'src/app/core/services/crud-snackbar.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-user-signin',
  templateUrl: './user-signin.component.html',
  styleUrls: ['./user-signin.component.scss']
})
export class UserSigninComponent implements OnInit {

  public signinForm!: FormGroup;
  public hasError: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private router: Router,
    private snackBar: CrudSnackbarService
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
    /**
     * this.signinForm.value => {"login": "bond", "pass": "007"}
     */
    this.userService.signin(this.signinForm.value)
    .subscribe({
      next: (response: any) => {
        // Your stuff here if 200
        this.router.navigate(['/', 'interns']);
        Logger.info(`User was found`)
      },
      error: (error: any) => {
        // Your stuff here if not 200
        this.signinForm.reset();
        this.hasError = true;
        setTimeout(() => this.hasError = false, 2500);
        Logger.info(`User was not found`);
      }
    }); // Trigger the signin process
  }

  public close(): void {
    this.hasError = false;
  }
}
