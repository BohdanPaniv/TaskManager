import { Injectable } from "@angular/core";

@Injectable({ providedIn: "root"})
export class StorageService{
    get(key: string): string | null {
        return localStorage.getItem(key);
    }

    set(key: string, value: string): void {
        localStorage.setItem(key, value);
    }

    remove(key: string): void {
        localStorage.removeItem(key);
    }

    clear(): void {
        localStorage.clear();
    }

    getParsed<T>(key: string): T | null {
        const value = this.get(key);
        return value ? JSON.parse(value) : null;
    }

    setParse<T>(key: string, value: T): void {
        this.set(key, JSON.stringify(value));
    }
}