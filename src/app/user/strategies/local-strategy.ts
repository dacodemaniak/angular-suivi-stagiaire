import { IStorage } from "./i-storage";

export class LocalStrategy implements IStorage {
    public store(key: string, value: string): void {
        localStorage.setItem(key, value);
    }

    public remove(key: string): void {
        localStorage.removeItem(key);
    }
}
