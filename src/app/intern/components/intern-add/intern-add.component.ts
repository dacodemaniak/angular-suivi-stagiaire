import { Component, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { take } from 'rxjs/operators';
import { Logger } from 'src/app/core/helpers/logger';
import { POE } from 'src/app/core/models/poe';
import { CrudSnackbarService } from '@services/crud-snackbar.service';
import { InternService } from '@services/intern.service';
import { POEService } from '@services/poe.service';
import { Intern } from './../../../core/models/intern';
import { Subscription } from 'rxjs';
import { DateValidator } from 'src/app/core/validators/date-validator';
@Component({
  selector: 'app-intern-add',
  templateUrl: './intern-add.component.html',
  styleUrls: ['./intern-add.component.scss']
})
export class InternAddComponent implements OnInit, OnDestroy {

  public internForm: FormGroup | null = null;
  public poes: POE[] = [];
  private subscription!: Subscription;

  constructor(
    private formBuilder: FormBuilder,
    private internService: InternService,
    private poeService: POEService,
    private router: Router,
    private crudSnackBar: CrudSnackbarService
  ) { }

  public get c(): {[key: string]: AbstractControl} {
    return this.internForm!.controls
  }

  ngOnInit(): void {
    this.poeService.findAll()
      .pipe(
        take(1)
      )
      .subscribe((poes: POE[]) => {
        Logger.info(`Got ${poes.length} poes`);
        this.poes = poes;

        this.internForm = this.formBuilder.group({
          name: [
            '', // Default value for the field control
            [
              Validators.required,
              Validators.minLength(2)
            ]
          ],
          firstName: [
            ''
          ],
          email: [
            '',
            [
              Validators.required,
              Validators.pattern(new RegExp('[a-z0-9]+@[a-z]+\.[a-z]{2,3}'))
            ]
          ],
          phoneNumber: [
            ''
          ],
          birthDate: [
            '',
            [
              Validators.required,
              DateValidator.dateNotLessThan
            ]
          ],
          poes: [
            '',
            Validators.required
          ]
        });        
      })
  }

  public ngOnDestroy(): void {
      this.subscription.unsubscribe();
  }
  
  /**
   * Call service to add an Intern
   * UPDATE : some DTO have to been sent to service combining Intern and POES of the Intern
   */
  public onSubmit(): void {
    console.log(`Bout to send : ${JSON.stringify(this.internForm!.value)}`);

    // We'll have to pass brand new intern to the add method of our service
    this.subscription = this.internService.add(this.internForm!.value)
      .subscribe((intern: Intern) => {
        Logger.info(`An intern was created : ${JSON.stringify(intern)}`);
        // Load a snack
        this.crudSnackBar.config(`Intern was successfully added`, `Got It`);
        this.crudSnackBar.open();
    
        // Finally go to the intern table component
        this.router.navigate(['/', 'interns']);
      });
  }
}
