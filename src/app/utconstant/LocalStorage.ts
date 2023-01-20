import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class LocalStorage {
  constructor() {}

  set(key: string, value: any) {
    localStorage.setItem(key, value);
  }

  get(key: string): any {
    return localStorage.getItem(key);
  }

  remove(key: string) {
    return localStorage.removeItem(key);
  }

  clear() {
    return localStorage.clear();
  }
}