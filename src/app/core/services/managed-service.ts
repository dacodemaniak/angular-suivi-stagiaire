export abstract class ManagedService {
    protected entityClassName: string = '';

    public constructor() {
        this.entityClassName = this.constructor.name
            .substring(0, this.constructor.name.indexOf('Service'))
            .toLowerCase();
    }
}
