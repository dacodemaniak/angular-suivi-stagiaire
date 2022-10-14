import { Pipe, PipeTransform } from '@angular/core';
import { Intern } from 'src/app/core/models/intern';

@Pipe({
  name: 'initial'
})
export class InitialPipe implements PipeTransform {

  transform(value: Intern, ...args: unknown[]): string {
    return (this.getFirstLetterOf(value.firstname!) + this.getFirstLetterOf(value.name!)).toUpperCase();
  }

  private getFirstLetterOf(value: string): string {
    return value && value !== '' ? value.charAt(0) : '';
  }

  /**
   * @deprecated Prefer use getFirstLetterOf(string): string
   * @see getFirstLetterOf()
   * @param value
   * @returns
   */
  private getInitialFirstname(value: Intern): string {
    return value.firstname!.charAt(0);
  }

  private getInitialLastname(value: Intern): string {
    return value.name!.charAt(0);
  }

  /**
   * Get initial(s) from the given argument according spaces dash or underscore char
   * @param value Name or Firstname ( -_PINA  BARACALDO)
   */
  private getInitials(value: string): string {
    value = value.trim();

    const regex: RegExp = /[-_ ]/g;
    let firstInitial: string = value.charAt(0); // ' '
    while(firstInitial.match(regex)) {
      value = value.substring(1); // PINA BARACALDO
      firstInitial = value.charAt(0); // P
    }

    let lastInitial: string = ''; // Get ''


    const matches: string[] | null = value.match(regex); // matches => [' ']
    if (matches !== null) {
      const sepChar: string = matches[0]; // ' '
      let matchPosition: number = value.indexOf(sepChar) + 1; // 4 + 1 = 5
        lastInitial = value.charAt(matchPosition); //  ' '
        while(lastInitial.match(regex)) {
          matchPosition  = matchPosition + 1; // 6
          lastInitial = value.charAt(matchPosition); // B
        }
    }
    return firstInitial + lastInitial;
  }

}
