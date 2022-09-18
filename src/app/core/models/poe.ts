import { Expose, plainToInstance, Type } from "class-transformer";
import 'reflect-metadata';
import { Logger } from "../helpers/logger";
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

  public deserialize(plainPOE: any): POE {
    const asClass: POE =  plainToInstance(POE, plainPOE, {excludeExtraneousValues: true});
    return asClass;
  }

}
