import { Component, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { take } from 'rxjs/operators';
import { Logger } from 'src/app/core/helpers/logger';
import { POE } from 'src/app/core/models/poe';
import { CrudSnackbarService } from '@services/crud-snackbar.service';
import { InternService } from '@services/intern.service';
import { Intern } from './../../../core/models/intern';
import { Subscription } from 'rxjs';
import { InternFormBuilder } from '../../builder/intern-form-builder';
import { POEService } from '@services/poe.service';
@Component({
  selector: 'app-intern-add',
  templateUrl: './intern-add.component.html',
  styleUrls: ['./intern-add.component.scss']
})
export class InternAddComponent implements OnInit, OnDestroy {

  public internForm: FormGroup | null = null;
  public poes: POE[] | null = [];
  private subscription!: Subscription;

  constructor(
    private formBuilder: FormBuilder, // DI
    private internService: InternService,
    private poeService: POEService,
    private router: Router,
    private crudSnackBar: CrudSnackbarService
  ) {}

  public get c(): {[key: string]: AbstractControl} {
    return this.internForm!.controls;
  }

  public get name(): AbstractControl | undefined {
    return this.internForm?.controls['name'];
  }

  ngOnInit(): void {
    /**
     * Try to instanciate my InternFormBuilder
     */
    const myInternForm: InternFormBuilder = new InternFormBuilder(this.formBuilder, this.poeService);
    this.internForm = myInternForm.internForm;

    // J'voudrais bien aussi les poes
    myInternForm.toggleAddPoes()
      .subscribe(
        (poes: POE[]) => {
          this.poes = poes;
        }
      );
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
