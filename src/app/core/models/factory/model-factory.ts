import { plainToInstance } from "class-transformer";
import { Serializable } from "../interfaces/serializable";
import { Intern } from "../intern";
import { POE } from "../poe";

import 'reflect-metadata';

export class ModelFactory implements Serializable {
    private models: Map<string, any> = new Map<string, any>();

    private instanceType: any;
    
    public constructor() {
        this.models
            .set(
                'intern',
                Intern
            )
            .set(
                'poe',
                POE
            )
    }

    public getInstance(type: string): ModelFactory {
        this.instanceType = this.models.get(type.toLowerCase());
        if (this.instanceType === undefined) {
            throw new Error(`Type ${type} is not a managed Model`);
        } else {
            return this;
        }
    }

    public deserialize(plainObject: any): any {
            return plainToInstance(this.instanceType, plainObject, {excludeExtraneousValues: true});
    }
}
