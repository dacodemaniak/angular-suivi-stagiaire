export interface IStorage {
    store(key: string, value: string): void;
    remove(key: string): void;
    get(key: string): string | null;
}
