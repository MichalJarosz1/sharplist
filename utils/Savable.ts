export default interface Savable<T>
{
    dumpData(): T[];
    reconstruct(dumpData: T[]): void;
    clear(): void;
    loadDefault(): void;
    save():void;
    reset():void;
    get storageKey(): string // should be the same for local as well as Database sql
}