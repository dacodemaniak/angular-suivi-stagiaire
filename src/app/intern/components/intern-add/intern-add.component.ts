import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { take } from 'rxjs/operators';
import { Logger } from 'src/app/core/helpers/logger';
import { POE } from 'src/app/core/models/poe';
import { CrudSnackbarService } from 'src/app/core/services/crud-snackbar.service';
import { InternService } from 'src/app/core/services/intern.service';
import { POEService } from 'src/app/core/services/poe.service';
import { DateLessThan } from 'src/app/core/validators/date-less-than';
import { Intern } from './../../../core/models/intern';
@Component({
  selector: 'app-intern-add',
  templateUrl: './intern-add.component.html',
  styleUrls: ['./intern-add.component.scss']
})
export class InternAddComponent implements OnInit {

  public internForm: FormGroup | null = null;
  public poes: POE[] = [];

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
              
            ]
          ],
          poes: [
            ''
          ]
        }, {
          validators: Validators.compose([
            DateLessThan.dateLessThan('birthDate', {dateLessThan: true})
          ])
        });        
      })

  }

  public onSubmit(): void {
    console.log(`Bout to send : ${JSON.stringify(this.internForm!.value)}`);
    const nextId: number = this.internService.getNextId();

    // Next we'll have to create a new Intern Instance
    const intern: Intern = new Intern();
    intern.id = nextId;
    intern.name = this.internForm!.value.name;

    // We'll have to pass brand new intern to the add method of our service
    this.internService.add(intern);

    // Load a snack
    this.crudSnackBar.config(`Intern was successfully added`, `Got It`);
    this.crudSnackBar.open();
    
    // Finally go to the intern table component
    this.router.navigate(['/', 'interns']);


  }

}
