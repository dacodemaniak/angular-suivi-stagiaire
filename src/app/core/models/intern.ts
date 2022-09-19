import { Expose, plainToInstance, Type } from "class-transformer";
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

  public deserialize(rawIntern: unknown): Intern {
    return plainToInstance(Intern, rawIntern, {excludeExtraneousValues: true});
  }
}
