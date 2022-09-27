import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { POEService } from "@services/poe.service";
import * as moment from "moment";
import { map, Observable, take } from "rxjs";
import { Intern } from "src/app/core/models/intern";
import { POE } from "src/app/core/models/poe";
import { DateLessThan } from "src/app/core/validators/date-less-than";
import { Logger } from "./../../core/helpers/logger";

export class InternFormBuilder {
  private form: FormGroup | null = null;
  private addPoes: boolean = false;
  private _poes: POE[] | null = null;
  private intern: Intern = new Intern(); // The intern we want to manage (empty Model first)

  public constructor(
    private formBuilder: FormBuilder,
    private poeService: POEService
  ) {


    this.intern.name = 'Andreotti';
    this.intern.firstname = 'Pia';
    this.intern.email = 'bli@bla.com';
    this.intern.phoneNumber = '07 23 56 89 87';
    this.intern.birthDate = new Date('1989-01-01');

    this._buildForm();
  } // Agrégation

  public get internForm(): FormGroup {
    return this.form!;
  }

  public toggleAddPoes(): Observable<POE[]> {
    return this.poeService.findAll()
    .pipe(
      take(1),
      map((poes: POE[]) => {
        this.addPoes = true;
        this._poes = poes;
        Logger.info('Je viens d\'être notifié de la liste des POE')
        const poesControl: FormControl = new FormControl('', Validators.required);
        this.form?.addControl('poes', poesControl);
        return poes;
      })
    );
  }

  public get poes(): POE[] | null {
    Logger.info('Je récupère la liste des POE')
    return this._poes;
  }
  private _buildForm(): void {
    /**
     * Build the intern form with all of controls needed except poes
     */
    this.form = this.formBuilder.group({
      name: [
        this.intern.name, // Default value for the field control
        [
          Validators.required,
          Validators.minLength(2)
        ]
      ],
      firstName: [
        this.intern.firstname
      ],
      email: [
        this.intern.email,
        [
          Validators.required,
          Validators.pattern(new RegExp('[a-z0-9]+@[a-z]+\.[a-z]{2,3}'))
        ]
      ],
      phoneNumber: [
        this.intern.phoneNumber
      ],
      birthDate: [
        this.intern.getBirthDateAsString(),
        [
          Validators.required,

        ]
      ],
    }, {
      validators: Validators.compose([
        DateLessThan.dateLessThan('birthDate', {dateLessThan: true})
      ])
    });
  }

}
