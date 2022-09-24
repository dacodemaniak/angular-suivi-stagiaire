import { Expose, plainToInstance, Type } from "class-transformer";
import 'reflect-metadata';
import { Serializable } from "./interfaces/serializable";

export class Intern implements Serializable<Intern> {
  @Expose()
  public id?: number;

  @Expose()
  public name: string = '';

  @Expose({name: 'firstName'})
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
    
  }

  public deserialize(rawIntern: any): Intern {
    return plainToInstance(Intern, rawIntern, {excludeExtraneousValues: true});
  }
}
