import { AbstractControl } from "@angular/forms";
import * as moment from "moment";

export class DateValidator {
    public static dateNotLessThan(control: AbstractControl): {[key: string]: any} | null {
        if (control.errors !== null) {
            return null;
        }
        const userEnteredDate: moment.Moment = moment(control.value);
        const today: moment.Moment = moment();
        return userEnteredDate.isSameOrAfter(today) ? {dateNotLessThan: true} : null;
      }
}
