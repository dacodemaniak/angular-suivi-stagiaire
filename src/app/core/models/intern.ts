import { Expose, plainToInstance, Type } from "class-transformer";
import * as moment from "moment";
import 'reflect-metadata';

export class Intern {
  @Expose()
  public id?: number;

  @Expose()
  public name: string;

  @Expose()
  public firstname?: string;

  @Expose()
  public phoneNumber?: string;

  @Expose()
  public email?: string;

  @Expose()
  @Type(() => Date)
  public birthDate?: Date;

  @Expose()
  public address?: string;

  public constructor() {
    this.name = '';
  }

  public getBirthDateAsString(): string {
    return this.birthDate ? moment(this.birthDate).format('YYYY-MM-DD') : '';
  }

  public getBirthDate(): Date | string {
    return this.birthDate ? this.birthDate : '';
  }

  public deserialize(rawIntern: unknown): Intern {
    return plainToInstance(Intern, rawIntern, {excludeExtraneousValues: true});
  }
}
