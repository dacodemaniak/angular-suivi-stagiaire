import { IStorage } from "./i-storage";

export class SessionStrategy implements IStorage {
    public store(key: string, value: string): void {
        sessionStorage.setItem(key, value);
    }

    public remove(key: string): void {
        sessionStorage.removeItem(key);
    }

    public get(key: string): string | null {
        return sessionStorage.getItem(key);
    }
}
