import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";
import * as moment from "moment";
import { Logger } from "../helpers/logger";

export class DateLessThan {
    public static dateLessThan(
        dateFieldName: string,
        validationErrors: ValidationErrors
    ): ValidatorFn {
        return (form: AbstractControl): ValidationErrors | null => {



            const dateFieldControl: AbstractControl | null = form.get('birthDate');

            if (dateFieldControl!.value && dateFieldControl!.value.toString().trim() === '') {
              return null;
            }

            if (dateFieldControl && dateFieldControl.errors !== null) {
                return null; // Already in error, so, let's continue
            }
            const value: moment.Moment = moment(dateFieldControl?.value);
            const today: moment.Moment = moment();

            return value.isAfter(today) ? validationErrors : null;
        }
    }
}
