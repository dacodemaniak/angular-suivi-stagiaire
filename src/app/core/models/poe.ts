import { Expose, plainToInstance, Type } from "class-transformer";
import 'reflect-metadata';
import { Serializable } from "./interfaces/serializable";
export class POE {
  @Expose()
  public id?: number;
  
  @Expose()
  public name: string = '';

  @Expose()
  @Type(() => Date)
  public  beginDate?: Date;

  @Expose()
  @Type(() => Date)
  public  endDate?: Date;

}
