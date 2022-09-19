import { IStorage } from 'src/app/user/strategies/i-storage';
import { LocalStrategy } from 'src/app/user/strategies/local-strategy';
import { SessionStrategy } from 'src/app/user/strategies/session-strategy';
import { environment } from './../../../environments/environment';

export class StorageStrategyFactory {
    public static getInstance(): IStorage {
        if (environment.hasOwnProperty('defaultStorageStrategy')) {
            if (environment.defaultStorageStrategy === 'session') {
                return new SessionStrategy();
            }
        }
        return new LocalStrategy();
    }
}
