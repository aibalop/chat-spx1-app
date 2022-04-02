import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root'
})
export class LocalStoreService {

  constructor(private storage: Storage) { 
    this.storage.create();
  }

  public async setItem(key: string, value: any) {
    try {
      await this.storage.set(key, value);
      return true;
    } catch (error) {
      return false;
    }
  }

  public async getItem(key: string) {
    try {
      const value: any = await this.storage.get(key);
      return value;
    } catch (e) {
      return null;
    }
  }
  public async clear() {
    await this.storage.clear();
  }

  public async removeItem(key: string) {
    await this.storage.remove(key);
  }

}
