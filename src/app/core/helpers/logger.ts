import * as moment from 'moment';

export abstract class Logger {
  public static globalStyle: string [] = [
    'color: white',
    'font-size: 16px'
  ]
  public static infoStyle: string[] = [
    'background: blue'
  ];

  public static info(message: string): void {
    console.log(Logger.messageBuilder(message), Logger.styleBuilder(Logger.infoStyle));
  }

  public static error(message: string): void {}

  public static warning(message: string): void {}

  private static messageBuilder(message: string): string {
    const currentMomentDate: moment.Moment = moment();
    const currentStringTime: string = currentMomentDate.format('h:mm:ss');

    return `${currentStringTime} : %c${message}`;
  }

  private static styleBuilder(customStyle: string[]): string {
    return Logger.globalStyle.concat(customStyle).join(';');
  }
}
